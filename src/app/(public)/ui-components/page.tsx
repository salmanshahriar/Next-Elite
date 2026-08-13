import { UiComponentsPage } from '@/components/pages/ui-components-page';
import { siteConfig } from '@/features/site/config';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('uiComponents');
  return {
    title: `${t('title')} | ${siteConfig.appName}`,
    description: t('description'),
  };
};

export default UiComponentsPage;
