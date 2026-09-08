import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { shouldShowWhatsApp, siteConfig, whatsappHref } from '@/config/site';
import { api, getFormSuccessMessage } from '@/api/client';

const SUCCESS_MESSAGE = 'Our mentor will reach out to you soon.';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const schema = z.object({
  name: z.string().trim().min(2, 'Enter your name').max(80),
  email: z.string().trim().email('Enter a valid email'),
  phone: z.string().trim().regex(/^[0-9+\-\s]{8,16}$/, 'Enter a valid phone number'),
  subject: z.string().trim().min(3, 'Enter a subject').max(120),
  message: z.string().trim().min(10, 'Please write a slightly longer message').max(2000),
});

type FormValues = z.infer<typeof schema>;

export default function ContactPage() {
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(SUCCESS_MESSAGE);
  const form = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    try {
      const { data } = await api.post('/contact', values);
      const message = getFormSuccessMessage(data);
      toast.success(message);
      form.reset();
      setSuccessMessage(message);
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      toast.error(error instanceof Error ? error.message : 'Could not send right now. Please try again.');
    }
  }

  const submitting = form.formState.isSubmitting;
  const phone = siteConfig.contact.phone.trim();
  const showWhatsApp = shouldShowWhatsApp();

  return (
    <>
      <Seo
        title="Talk to a Mentor"
        description="Ask Codex Nova about courses, batches, and enrolment. A mentor will connect with you soon."
        path="/contact"
      />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">Talk to a Mentor</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Share your questions about courses, batches, or career help. Send a message and we will get back to you.
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          {success ? (
            <div className="rounded-2xl border border-success/30 bg-green-50 p-6">
              <h2 className="font-bold text-ink">Thank you!</h2>
              <p className="mt-2 text-sm text-muted">{successMessage}</p>
              <Button
                className="mt-4"
                type="button"
                variant="outline"
                onClick={() => {
                  setSuccess(false);
                  form.reset();
                }}
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form
              className="space-y-4 rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft md:p-8"
              onSubmit={form.handleSubmit(onSubmit)}
              noValidate
            >
              <Input label="Name" {...form.register('name')} error={form.formState.errors.name?.message} required />
              <Input label="Email" type="email" {...form.register('email')} error={form.formState.errors.email?.message} required />
              <Input label="Phone" {...form.register('phone')} error={form.formState.errors.phone?.message} required />
              <Input label="Subject" {...form.register('subject')} error={form.formState.errors.subject?.message} required />
              <Textarea label="Message" {...form.register('message')} error={form.formState.errors.message?.message} required />
              <Button type="submit" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          )}

          <aside className="h-fit space-y-4 rounded-2xl border border-border bg-surface-elevated p-5 text-sm shadow-soft md:p-6">
            <Info icon={Mail} label="Email" value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
            <Info
              icon={Phone}
              label="Mobile"
              value={phone || 'Mobile number coming soon'}
              href={phone ? `tel:${phone.replace(/\s/g, '')}` : undefined}
            />
            {siteConfig.contact.address ? (
              <Info icon={MapPin} label="Address" value={siteConfig.contact.address} />
            ) : null}
            <Info icon={Clock} label="Office hours" value={siteConfig.contact.officeHours} />
            {showWhatsApp ? (
              <a
                className="inline-flex min-h-11 items-center font-semibold text-primary transition-colors hover:underline"
                href={whatsappHref('Hi Codex Nova, I would like to talk to a mentor.')}
                target="_blank"
                rel="noreferrer"
              >
                Chat on WhatsApp
              </a>
            ) : null}
          </aside>
        </div>
      </div>
    </>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-5 w-5 text-primary" aria-hidden />
      <div>
        <p className="font-semibold text-ink">{label}</p>
        {href ? (
          <a href={href} className="text-muted transition-colors hover:text-primary">
            {value}
          </a>
        ) : (
          <p className="text-muted">{value}</p>
        )}
      </div>
    </div>
  );
}
