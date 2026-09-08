import { LegalPage } from './PrivacyPage';

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      path="/terms"
      description="Terms of use for the Codex Nova website and enrolment enquiries."
      sections={[
        {
          heading: 'Use of the site',
          body: 'This website describes educational courses. Content, fees, and schedules may change. Please confirm details before you enroll.',
        },
        {
          heading: 'Enrolment',
          body: 'Submitting a form is a request to join, not a paid contract, until Codex Nova confirms a seat.',
        },
        {
          heading: 'Intellectual property',
          body: 'Codex Nova branding, course outlines, and original site content belong to the institute unless noted otherwise.',
        },
        {
          heading: 'Liability',
          body: 'We do not guarantee internships, jobs, or salary outcomes. Learning results depend on practice and other factors.',
        },
      ]}
    />
  );
}
