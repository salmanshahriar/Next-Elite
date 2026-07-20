import RegisterForm from '@/features/auth/components/register-form';
import { getCurrentUser } from '@/features/auth/server/get-current-user';
import { redirect } from 'next/navigation';

const RegisterPage = async () => {
  const user = await getCurrentUser();
  if (user) redirect('/dashboard');

  return <RegisterForm />;
};

export default RegisterPage;
