import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { courseSelectOptions } from '@/content/courses';
import { api, getFormSuccessMessage } from '@/api/client';

const SUCCESS_MESSAGE = 'Our mentor will reach out to you soon.';

const schema = z.object({
  fullName: z.string().trim().min(2, 'Enter your full name').max(80),
  email: z.string().trim().email('Enter a valid email'),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,16}$/, 'Enter a valid phone number'),
  city: z.string().trim().min(2, 'Enter your city').max(80),
  college: z.string().trim().min(2, 'Enter your college or institute').max(120),
  degree: z.string().trim().min(2, 'Enter your degree or course').max(80),
  branch: z.string().trim().min(2, 'Enter your branch').max(80),
  year: z.string().min(1, 'Select year'),
  course: z.string().min(1, 'Select a course'),
  preferredMode: z.enum(['Online', 'Other modes coming soon']),
  message: z.string().trim().max(2000).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function EnrollPage() {
  const [params] = useSearchParams();
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(SUCCESS_MESSAGE);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      course: params.get('course') ?? '',
      preferredMode: 'Online',
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const { data } = await api.post('/enrollments', {
        ...values,
        paymentStatus: 'pending',
      });
      const message = getFormSuccessMessage(data);
      toast.success(message);
      form.reset({ preferredMode: 'Online', course: '' });
      setSuccessMessage(message);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(error instanceof Error ? error.message : 'Could not submit. Please try again.');
    }
  }

  const submitting = form.formState.isSubmitting;

  return (
    <>
      <Seo
        title="Enroll Now"
        description="Enroll at Codex Nova. Share your details and a mentor will connect with you soon."
        path="/enroll"
      />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Enroll' }]} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Enroll Now</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Fill this form to join a course. We will save your details and a mentor will contact you with
          batch and fee information.
        </p>

        {success ? (
          <div className="mt-8 max-w-3xl rounded-2xl border border-success/30 bg-green-50 p-6 shadow-soft">
            <h2 className="font-bold text-ink">Thank you!</h2>
            <p className="mt-2 text-sm text-muted">{successMessage}</p>
            <Button
              className="mt-4"
              type="button"
              variant="outline"
              onClick={() => {
                setSuccess(false);
                form.reset({ preferredMode: 'Online' });
              }}
            >
              Submit another
            </Button>
          </div>
        ) : (
          <form
            className="mt-8 grid max-w-3xl gap-4 rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft md:grid-cols-2 md:p-8"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <Input label="Full Name" {...form.register('fullName')} error={form.formState.errors.fullName?.message} required />
            <Input label="Email" type="email" {...form.register('email')} error={form.formState.errors.email?.message} required />
            <Input label="Phone" {...form.register('phone')} error={form.formState.errors.phone?.message} required />
            <Input label="City" {...form.register('city')} error={form.formState.errors.city?.message} required />
            <Input label="College" {...form.register('college')} error={form.formState.errors.college?.message} required />
            <Input label="Degree" {...form.register('degree')} error={form.formState.errors.degree?.message} required />
            <Input label="Branch" {...form.register('branch')} error={form.formState.errors.branch?.message} required />
            <Select
              label="Year"
              required
              {...form.register('year')}
              error={form.formState.errors.year?.message}
              options={['1st year', '2nd year', '3rd year', 'Final year', 'Graduate', 'Working professional'].map(
                (item) => ({ value: item, label: item }),
              )}
            />
            <Select
              label="Course"
              required
              {...form.register('course')}
              error={form.formState.errors.course?.message}
              options={courseSelectOptions}
            />
            <Select
              label="Preferred Mode"
              required
              {...form.register('preferredMode')}
              error={form.formState.errors.preferredMode?.message}
              options={[
                { value: 'Online', label: 'Online' },
                { value: 'Other modes coming soon', label: 'Other modes coming soon' },
              ]}
            />
            <div className="md:col-span-2">
              <Textarea label="Message" {...form.register('message')} error={form.formState.errors.message?.message} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit enrolment enquiry'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
