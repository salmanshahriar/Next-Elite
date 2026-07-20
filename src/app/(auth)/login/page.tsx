import LoginForm from '@/features/auth/components/login-form';
import { getCurrentUser } from '@/features/auth/server/get-current-user';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return <LoginForm />;
};

export default LoginPage;
