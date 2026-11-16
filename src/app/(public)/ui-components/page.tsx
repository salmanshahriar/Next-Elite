import { UiComponentsPage } from '@/_demo(DELETE)/pages/ui-components-page';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('uiComponents');
  return {
    title: t('title'),
    description: t('description'),
  };
};

export default UiComponentsPage;
