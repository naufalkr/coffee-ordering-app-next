import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { encode } from "next-auth/jwt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validasi input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Validasi password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Buat token JWT
    if (!process.env.NEXTAUTH_SECRET) {
      return new Response(
        JSON.stringify({ error: "Missing NEXTAUTH_SECRET" }),
        { status: 500 }
      );
    }

    const token = await encode({
      token: {
        id: user.user_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePicture: user.profile_picture,
      },
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Response berhasil
    return new Response(
      JSON.stringify({
        message: "Login successful",
        token,
        user: {
          id: user.user_id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          profilePicture: user.profile_picture,
        },
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
