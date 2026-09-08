import { MessageCircle } from 'lucide-react';
import { shouldShowWhatsApp, whatsappHref } from '@/config/site';

export function WhatsAppCta() {
  if (!shouldShowWhatsApp()) return null;

  return (
    <a
      href={whatsappHref('Hi Codex Nova, I would like to talk to a mentor.')}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#128C7E] px-4 text-sm font-semibold text-white shadow-lift transition-transform duration-200 hover:scale-105 hover:bg-[#0e7a6e] active:scale-95"
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      Chat on WhatsApp
    </a>
  );
}
