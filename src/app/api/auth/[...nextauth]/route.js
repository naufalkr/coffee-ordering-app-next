// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        console.log("[DEBUG] Google Profile:", profile);

        // Pisahkan firstName dan lastName dari nama lengkap
        const [firstName, ...lastNameParts] = profile.name.split(" ");
        const lastName = lastNameParts.join(" ");

        return {
          id: profile.sub, // Gunakan ID Google sebagai ID unik
          email: profile.email,
          firstName: firstName || null,
          lastName: lastName || null,
          profilePicture: profile.picture || null,
        };
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("[DEBUG] Authorize credentials:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.error("[DEBUG] Missing email or password");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          console.log("[DEBUG] User found:", user);

          if (!user) {
            console.error("[DEBUG] No user found with the provided email");
            return null;
          }

          const isPasswordValid = bcrypt.compareSync(credentials.password, user.password_hash);
          console.log("[DEBUG] Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            console.error("[DEBUG] Invalid password");
            return null;
          }

          return {
            id: user.user_id.toString(),
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            profilePicture: user.profile_picture,
          };
        } catch (error) {
          console.error("[DEBUG] Error during user authorization:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log("[DEBUG] JWT Callback - Before:", { token, user, account, profile });

      // Jika user login dengan Google
      if (account && account.provider === "google" && profile) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.profilePicture = user.profilePicture;
      }

      // Jika user login dengan Credentials
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.profilePicture = user.profilePicture;
      }

      console.log("[DEBUG] JWT Callback - After:", token);
      return token;
    },

    async session({ session, token }) {
      console.log("[DEBUG] Session Callback - Before:", { session, token });

      session.user = {
        id: token.id,
        email: token.email,
        firstName: token.firstName || null, // First name dari Google atau null
        lastName: token.lastName || null,  // Last name dari Google atau null
        profilePicture: token.profilePicture || null,
      };

      console.log("[DEBUG] Session Callback - After:", session);
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
