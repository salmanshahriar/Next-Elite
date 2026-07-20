import { siteConfig } from '@/features/site/config';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import dynamic from 'next/dynamic';

const UiComponentsShowcase = dynamic(
  () =>
    import('@/components/shared/ui-components-showcase').then(
      (module) => module.UiComponentsShowcase,
    ),
  {
    loading: () => (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    ),
  },
);

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('uiComponents');
  return {
    title: `${t('title')} | ${siteConfig.appName}`,
    description: t('description'),
  };
};

const UiComponentsPage = () => {
  return <UiComponentsShowcase />;
};

export default UiComponentsPage;
