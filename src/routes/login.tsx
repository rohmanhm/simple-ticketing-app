import { LoginForm } from '@/features/auth';

export const LoginPage = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center md:h-screen md:max-w-2xl">
      <div className="flex w-full flex-col items-center justify-center rounded-xl bg-slate-900 py-20">
        <div className="mx-auto mb-10 flex flex-col items-center justify-center">
          <span className="text-4xl dark:text-slate-300">Welcome back!</span>
          <p className="text-md dark:text-slate-600">
            Please sign in to your account to continue
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
