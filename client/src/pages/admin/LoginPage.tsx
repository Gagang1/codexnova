import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Seo } from '@/components/ui/Seo';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function LoginPage() {
  const { user, login } = useAuth();
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  if (user) return <Navigate to="/admin" replace />;

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      await login(values.email, values.password);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  return (
    <>
      <Seo title="Admin login" description="Codex Nova admin access" path="/admin/login" noIndex />
      <div className="flex min-h-dvh items-center justify-center bg-surface px-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-4 border border-border bg-surface-elevated p-6 shadow-soft"
        >
          <h1 className="text-2xl font-extrabold text-ink">Admin login</h1>
          <p className="text-sm text-muted">Use the seeded superadmin credentials from your server environment.</p>
          <Input label="Email" type="email" {...form.register('email')} error={form.formState.errors.email?.message} required />
          <Input label="Password" type="password" {...form.register('password')} error={form.formState.errors.password?.message} required />
          <Button type="submit" fullWidth disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </div>
    </>
  );
}
