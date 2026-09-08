import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone, Youtube } from 'lucide-react';
import { shouldShowWhatsApp, siteConfig, whatsappHref } from '@/config/site';
import { BrandLink } from './BrandLink';

const explore = [
  { to: '/courses', label: 'Courses' },
  { to: '/events', label: 'Events' },
  { to: '/blog', label: 'Blog' },
];

const company = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/enroll', label: 'Enroll' },
];

const legal = [
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms' },
  { to: '/refund-policy', label: 'Refund Policy' },
  { to: '/cookie-policy', label: 'Cookie Policy' },
];

const socialItems = [
  { href: siteConfig.social.instagram, label: 'Instagram', icon: Instagram, hover: 'hover:text-[#E4405F] hover:shadow-[0_0_16px_rgb(228_64_95_/_0.35)]' },
  { href: siteConfig.social.linkedin, label: 'LinkedIn', icon: Linkedin, hover: 'hover:text-[#0A66C2] hover:shadow-[0_0_16px_rgb(10_102_194_/_0.35)]' },
  { href: siteConfig.social.youtube, label: 'YouTube', icon: Youtube, hover: 'hover:text-[#FF0000] hover:shadow-[0_0_16px_rgb(255_0_0_/_0.35)]' },
  { href: siteConfig.social.facebook, label: 'Facebook', icon: Facebook, hover: 'hover:text-[#1877F2] hover:shadow-[0_0_16px_rgb(24_119_242_/_0.35)]' },
] as const;

function SocialLink({
  href,
  label,
  className,
  children,
}: {
  href: string;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={`social-icon ${className ?? ''}`}
    >
      {children}
    </a>
  );
}

export function Footer() {
  const showWhatsApp = shouldShowWhatsApp();
  const email = siteConfig.contact.email;
  const phone = siteConfig.contact.phone.trim();

  return (
    <footer className="bg-ink text-white">
      <div className="container-cxn grid gap-10 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <BrandLink logoSize="lg" markSize="lg" tone="dark" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.tagline}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">{siteConfig.description}</p>
        </div>

        <FooterColumn title="Explore" links={explore} />
        <FooterColumn title="Company" links={company} />
        <FooterColumn title="Legal" links={legal} />

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {phone ? (
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="transition-colors hover:text-white">
                  {phone}
                </a>
              ) : (
                <span className="text-white/45">Mobile number coming soon</span>
              )}
            </li>
            {showWhatsApp ? (
              <li>
                <a
                  href={whatsappHref('Hi Codex Nova, I would like to talk to a mentor.')}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                  Chat on WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-cxn flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2" aria-label="Social media">
            {socialItems.map((item) => (
              <SocialLink key={item.label} href={item.href} label={item.label} className={item.hover}>
                <item.icon className="h-5 w-5" />
              </SocialLink>
            ))}
            {showWhatsApp ? (
              <SocialLink
                href={whatsappHref('Hi Codex Nova, I would like to talk to a mentor.')}
                label="WhatsApp"
                className="hover:text-[#25D366] hover:shadow-[0_0_16px_rgb(37_211_102_/_0.4)]"
              >
                <MessageCircle className="h-5 w-5" />
              </SocialLink>
            ) : null}
            <SocialLink
              href={`mailto:${email}`}
              label="Email"
              className="hover:text-primary-300 hover:shadow-[0_0_16px_rgb(96_165_250_/_0.35)]"
            >
              <Mail className="h-5 w-5" />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div className="lg:col-span-2">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/50">{title}</p>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-white/75 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
