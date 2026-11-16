import { siteConfig } from '@/features/site/config';

const APP_TITLE = siteConfig.appName || siteConfig.title;

function DocumentTitle({ title }: { title: string }) {
  return <title>{`${title} | ${APP_TITLE}`}</title>;
}

export { DocumentTitle };
