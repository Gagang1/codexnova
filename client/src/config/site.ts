export const siteConfig = {
  name: 'CodeXNova',
  legalName: 'CodeXNova',
  tagline: 'Learn useful skills. Build real projects. Get career-ready.',
  description:
    'Codex Nova helps students from different educational backgrounds learn practical technology skills, build useful knowledge, and prepare for their careers.',
  url: import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
  announcement: 'New batches starting soon for C, C++, Java, and Python. Enroll now to join the next group.',
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || 'contact.codexnova@gmail.com',
    phone: import.meta.env.VITE_CONTACT_PHONE || '',
    address: import.meta.env.VITE_CONTACT_ADDRESS || '',
    officeHours: 'Mon–Sat, 10:00 AM – 7:00 PM IST',
    mapEmbedUrl: import.meta.env.VITE_CONTACT_MAP_EMBED_URL || '',
  },
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '',
  viewWhatsappNumber: import.meta.env.VITE_VIEW_WHATSAPP_NUMBER || '',
  social: {
    instagram: import.meta.env.VITE_SOCIAL_INSTAGRAM || '',
    linkedin: import.meta.env.VITE_SOCIAL_LINKEDIN || '',
    youtube: import.meta.env.VITE_SOCIAL_YOUTUBE || '',
    facebook: import.meta.env.VITE_SOCIAL_FACEBOOK || '',
  },
  analytics: {
    gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
    metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
  },
} as const;

export function hasValidWhatsAppNumber(value = siteConfig.whatsappNumber) {
  return value.replace(/\D/g, '').length >= 10;
}

/** Hide WhatsApp when the number is missing, or when `view_whatsapp_number` is set. */
export function shouldShowWhatsApp() {
  if (siteConfig.viewWhatsappNumber.trim()) return false;
  return hasValidWhatsAppNumber();
}

export function whatsappHref(message?: string) {
  const number = siteConfig.whatsappNumber.replace(/\D/g, '');
  if (!number) return '';
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
] as const;
