import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppCta } from '@/components/layout/WhatsAppCta';
import { Analytics } from '@/components/layout/Analytics';
import { SkipLink } from '@/components/layout/SkipLink';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { PageTransition } from '@/components/layout/PageTransition';

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <ScrollToTop />
      <SkipLink />
      <Analytics />
      <AnnouncementBar />
      <Navbar />
      <main id="main" className="flex-1">
        <PageTransition />
      </main>
      <Footer />
      <WhatsAppCta />
    </div>
  );
}
