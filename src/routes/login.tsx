import { LoginForm } from '@/features/auth';

export const LoginPage = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center py-8 md:h-screen md:max-w-2xl md:px-6">
      <LoginForm />
    </div>
  );
};
