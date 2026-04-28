import { baseUrl, siteConfig } from '@/lib/config/site';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import type React from 'react';

import ClientProviders from '@/app/client-providers';
import {
  getLocaleDirection,
  getRequestLocale,
} from '@/features/i18n/server/get-request-locale';
import Script from 'next/script';
import './globals.css';
export const metadata: Metadata = {
  title: siteConfig.appName ? siteConfig.appName : siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords.filter(Boolean),
  authors: siteConfig.organization.name
    ? [{ name: siteConfig.organization.name, url: siteConfig.organization.url }]
    : undefined,
  creator: siteConfig.organization.name || undefined,
  publisher: siteConfig.organization.name || undefined,
  formatDetection: { email: true, address: true, telephone: true },
  metadataBase: baseUrl ? new URL(baseUrl) : undefined,
  alternates: baseUrl ? { canonical: siteConfig.canonicalPath } : undefined,
  applicationName: siteConfig.appName || undefined,
  category: siteConfig.applicationCategory || undefined,
  openGraph: siteConfig.appName
    ? {
        type: 'website',
        locale: siteConfig.locale,
        url: baseUrl,
        title: `${siteConfig.appName} | ${siteConfig.tagline}`,
        description: siteConfig.description,
        siteName: siteConfig.appName,
        images: siteConfig.images.og
          ? [
              {
                url: siteConfig.images.og,
                width: siteConfig.images.ogWidth,
                height: siteConfig.images.ogHeight,
                alt: `${siteConfig.appName} - ${siteConfig.tagline}`,
              },
            ]
          : undefined,
      }
    : undefined,
  twitter: siteConfig.social.twitter
    ? {
        card: 'summary_large_image',
        title: siteConfig.appName
          ? `${siteConfig.appName} | ${siteConfig.tagline}`
          : siteConfig.title,
        description: siteConfig.description,
        images: siteConfig.images.og ? [siteConfig.images.og] : undefined,
        creator: siteConfig.social.twitter,
      }
    : undefined,
  icons: {
    icon: [
      { url: siteConfig.icons.favicon, sizes: 'any' },
      { url: siteConfig.icons.svg, type: 'image/svg+xml' },
    ],
    apple: siteConfig.icons.appleTouchIcon,
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const locale = await getRequestLocale();
  const dir = getLocaleDirection(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5"
        />

        <link rel="icon" href={siteConfig.icons.favicon} sizes="any" />
        <link rel="icon" href={siteConfig.icons.svg} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={siteConfig.icons.appleTouchIcon} />

        <meta
          name="theme-color"
          content={siteConfig.theme.dark}
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content={siteConfig.theme.light}
          media="(prefers-color-scheme: light)"
        />

        {siteConfig.description && (
          <meta name="description" content={siteConfig.description} />
        )}
        {baseUrl && (
          <link
            rel="canonical"
            href={`${baseUrl}${siteConfig.canonicalPath}`}
          />
        )}
      </head>
      <body className="font-sans antialiased">
        <ClientProviders>
          <div className="flex min-h-screen flex-col">{children}</div>
        </ClientProviders>
        <Analytics />

        {siteConfig.organization.name && (
          <Script
            id="schema-organization"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': `${baseUrl}/#organization`,
                name: siteConfig.organization.name,
                legalName:
                  siteConfig.organization.legalName ||
                  siteConfig.organization.name,
                url: baseUrl,
                logo: siteConfig.images.logo
                  ? `${baseUrl}${siteConfig.images.logo}`
                  : undefined,
                description: siteConfig.organization.description,
                email: siteConfig.organization.email || undefined,
                telephone: siteConfig.organization.phone || undefined,
                foundingDate: siteConfig.organization.foundingDate || undefined,
                sameAs: Object.values(siteConfig.social).filter(Boolean),
                address: siteConfig.organization.address.city
                  ? {
                      '@type': 'PostalAddress',
                      streetAddress: siteConfig.organization.address.street,
                      addressLocality: siteConfig.organization.address.city,
                      addressRegion: siteConfig.organization.address.region,
                      postalCode: siteConfig.organization.address.postalCode,
                      addressCountry:
                        siteConfig.organization.address.countryCode,
                    }
                  : undefined,
              }),
            }}
          />
        )}

        {siteConfig.appName && (
          <Script
            id="schema-webapp"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type':
                  siteConfig.applicationCategory === 'EducationalApplication'
                    ? 'EducationalApplication'
                    : 'SoftwareApplication',
                '@id': `${baseUrl}/#webapp`,
                name: siteConfig.appName,
                description: siteConfig.description,
                url: baseUrl,
                applicationCategory:
                  siteConfig.applicationCategory || 'WebApplication',
                applicationSubCategory: siteConfig.appType || undefined,
                operatingSystem: 'Web Browser',
                offers: siteConfig.pricing.model
                  ? {
                      '@type': 'Offer',
                      price: siteConfig.pricing.minPrice || '0',
                      priceCurrency: siteConfig.pricing.currency,
                      priceSpecification: siteConfig.pricing.maxPrice
                        ? {
                            '@type': 'PriceSpecification',
                            minPrice: siteConfig.pricing.minPrice,
                            maxPrice: siteConfig.pricing.maxPrice,
                            priceCurrency: siteConfig.pricing.currency,
                          }
                        : undefined,
                    }
                  : undefined,
                aggregateRating: undefined,
                author: siteConfig.organization.name
                  ? {
                      '@type': 'Organization',
                      '@id': `${baseUrl}/#organization`,
                      name: siteConfig.organization.name,
                    }
                  : undefined,
                featureList: siteConfig.features.filter(Boolean),
                screenshot: siteConfig.images.og
                  ? `${baseUrl}${siteConfig.images.og}`
                  : undefined,
              }),
            }}
          />
        )}

        {baseUrl && (
          <Script
            id="schema-website"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': `${baseUrl}/#website`,
                url: baseUrl,
                name: siteConfig.appName || siteConfig.title,
                description: siteConfig.description,
                publisher: siteConfig.organization.name
                  ? {
                      '@id': `${baseUrl}/#organization`,
                    }
                  : undefined,
                potentialAction: {
                  '@type': 'SearchAction',
                  target: `${baseUrl}/search?q={search_term_string}`,
                  'query-input': 'required name=search_term_string',
                },
                inLanguage: siteConfig.language,
              }),
            }}
          />
        )}

        {siteConfig.appType &&
          siteConfig.appType.toLowerCase().includes('saas') && (
            <Script
              id="schema-service"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Service',
                  '@id': `${baseUrl}/#service`,
                  name: siteConfig.appName,
                  description: siteConfig.description,
                  provider: siteConfig.organization.name
                    ? {
                        '@id': `${baseUrl}/#organization`,
                      }
                    : undefined,
                  serviceType: siteConfig.appType,
                  areaServed: 'Worldwide',
                  availableChannel: {
                    '@type': 'ServiceChannel',
                    serviceUrl: baseUrl,
                  },
                }),
              }}
            />
          )}
      </body>
    </html>
  );
};

export default RootLayout;
