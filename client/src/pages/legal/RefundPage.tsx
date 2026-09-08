import { LegalPage } from './PrivacyPage';

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund Policy"
      path="/refund-policy"
      description="Refund principles for Codex Nova programmes."
      sections={[
        {
          heading: 'Before payment integration',
          body: 'Enrolment on this site is currently an enquiry. No online payment is collected, so no automated refunds apply.',
        },
        {
          heading: 'After paid cohorts launch',
          body: 'Publish cohort-specific refund windows, cancellation cut-offs, and exceptions (for example medical or institute-cancelled batches) here. Do not go live with this placeholder as the sole policy.',
        },
        {
          heading: 'How to request',
          body: 'Use the contact form or email contact.codexnova@gmail.com.',
        },
      ]}
    />
  );
}
