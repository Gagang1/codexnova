import { Seo } from '@/components/ui/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

type LegalPageProps = {
  title: string;
  path: string;
  description: string;
  sections: { heading: string; body: string }[];
};

export function LegalPage({ title, path, description, sections }: LegalPageProps) {
  return (
    <>
      <Seo title={title} description={description} path={path} />
      <div className="container-cxn py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: title }]} />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink">{title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated: 3 September 2026.</p>
        <div className="mt-8 max-w-2xl space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-ink">{section.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy"
      description="How Codex Nova intends to handle personal data collected through this website."
      sections={[
        {
          heading: 'What we collect',
          body: 'Contact and enrolment forms collect name, email, phone, academic details, and your message. Server logs may include technical metadata. Do not submit unnecessary sensitive data.',
        },
        {
          heading: 'How we use it',
          body: 'To reply to your questions, run courses, improve the site, and follow the law. We do not sell personal information.',
        },
        {
          heading: 'Storage & security',
          body: 'Data is stored in your configured MongoDB instance and protected with authentication, validation, and security headers. Retention periods should be set in admin settings before launch.',
        },
        {
          heading: 'Your choices',
          body: 'Contact the institute using the published email to request access, correction, or deletion, subject to applicable law.',
        },
      ]}
    />
  );
}
