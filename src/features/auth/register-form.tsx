import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

import { useAuth } from './hooks/use-auth';
import { useRegisterMutation } from './services';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterForm = () => {
  const { saveUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerMutation = useRegisterMutation({
    onSettled(response, error) {
      if (response?.error || error) {
        return toast({
          variant: 'destructive',
          description: response?.error ?? error?.message,
        });
      }

      toast({
        variant: 'success',
        description: 'Register a new user success. Redirecting to dashboard.',
      });

      // Store user session in cookies
      saveUser({ email: response?.data.email ?? '' });

      setTimeout(() => {
        navigate('/');
      }, 1000);
    },
  });

  function onSubmit(values: z.infer<typeof FormSchema>) {
    registerMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-5/6 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button
            className="flex-1"
            variant="default"
            size="lg"
            type="submit"
            isLoading={registerMutation.isPending}
          >
            Sign-Up
          </Button>
        </div>
      </form>
    </Form>
  );
};
