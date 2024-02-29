import { Link } from 'react-router-dom';

import { RegisterForm } from '@/features/auth';

export const RegisterPage = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center md:h-screen md:max-w-lg">
      <div className="flex w-full flex-col items-center justify-center rounded-xl border-4 py-20 dark:border-slate-900">
        <div className="mx-auto mb-10 flex flex-col items-center justify-center">
          <span className="text-4xl dark:text-slate-300">
            Create a new account
          </span>
          <p className="text-md dark:text-slate-600">
            Please register to setup your account to continue
          </p>
        </div>
        <RegisterForm />
        <div className="mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
