import { UserAuth } from '../../components/container/UserAuth';
import { UserLoginForm } from '../../components/container/UserLoginForm';

export function User() {
  // Anda bisa menyimpan data user statis atau menggunakan state untuk menggantikan data pengguna
  const user = null; // Simulasi user yang belum login (atau sesuaikan sesuai kebutuhan)

  const onSubmitLogin = (data: {
    email: string;
    passwordHash: string;
  }) => {
    // Logika untuk menangani login, bisa langsung menggunakan API untuk login jika diperlukan
    console.log('Login Data:', data);
  };

  if (!user) {
    // return <UserLoginForm onSubmit={onSubmitLogin} />;
    return <UserLoginForm />;

  }

  const signOutUser = () => {
    // Logika untuk logout (misalnya dengan menghapus sesi atau token)
    console.log('User has signed out');
  };

  return <UserAuth />;
  // user={user} signOut={signOutUser}
}
