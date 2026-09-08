import { LegalPage } from './PrivacyPage';

export default function CookiePage() {
  return (
    <LegalPage
      title="Cookie Policy"
      path="/cookie-policy"
      description="How Codex Nova uses cookies and similar storage on this website."
      sections={[
        {
          heading: 'Essential cookies',
          body: 'Authentication cookies (HTTP-only) are used for the admin session when you log in. They are required for the dashboard to work.',
        },
        {
          heading: 'Analytics & ads',
          body: 'Google Analytics and Meta Pixel IDs are environment variables and are not injected unless you set them. When enabled, document those cookies here.',
        },
        {
          heading: 'Control',
          body: 'You can block non-essential cookies in your browser. Essential admin cookies cannot be disabled if you use the dashboard.',
        },
      ]}
    />
  );
}
