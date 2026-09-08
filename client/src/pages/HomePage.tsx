import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/ui/Seo';
import { siteConfig } from '@/config/site';
import { catalogService } from '@/services/catalog';
import { HomeHero } from '@/components/home/HomeHero';
import { TrustSection } from '@/components/home/TrustSection';
import { PopularCourses } from '@/components/home/PopularCourses';
import { WhySection } from '@/components/home/WhySection';
import { MethodSection } from '@/components/home/MethodSection';
import { EcosystemSection } from '@/components/home/EcosystemSection';
import { OutcomesSection } from '@/components/home/OutcomesSection';
import { CareerSection } from '@/components/home/CareerSection';
import { FaqSection } from '@/components/home/FaqSection';
import { FinalCta } from '@/components/home/FinalCta';
import { CardSkeleton } from '@/components/ui/Skeleton';

export default function HomePage() {
  const courses = useQuery({ queryKey: ['courses'], queryFn: () => catalogService.courses() });
  const faqs = useQuery({ queryKey: ['faqs'], queryFn: catalogService.faqs });

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'Organization'],
    name: siteConfig.name,
    slogan: siteConfig.tagline,
    url: siteConfig.url,
    description: siteConfig.description,
  };

  return (
    <>
      <Seo
        title="Codex Nova — Learn useful skills. Build real projects."
        description={siteConfig.description}
        path="/"
        jsonLd={orgJsonLd}
      />
      <HomeHero />
      <TrustSection />
      {courses.isLoading ? (
        <div className="container-cxn grid gap-5 py-16 sm:grid-cols-2 md:py-24 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <PopularCourses courses={courses.data ?? []} />
      )}
      <WhySection />
      <MethodSection />
      <EcosystemSection />
      <OutcomesSection />
      <CareerSection />
      <FaqSection items={faqs.data ?? []} />
      <FinalCta />
    </>
  );
}
