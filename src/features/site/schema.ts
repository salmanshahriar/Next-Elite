import { z } from 'zod';

const localeDefinitionSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  nativeName: z.string().min(1),
  locale: z.string().min(1),
  direction: z.enum(['ltr', 'rtl']),
});

export const siteConfigSchema = z.object({
  appName: z.string().min(1),
  appType: z.string().min(1),
  tagline: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  locale: z.string().min(1),
  language: z.string().min(1),
  domain: z.string().url(),
  canonicalPath: z.string().min(1),
  applicationCategory: z.string().min(1),
  audience: z.string().min(1),
  keywords: z.array(z.string().min(1)),
  features: z.array(z.string().min(1)),
  languages: z.object({
    supported: z.array(z.string().min(1)).min(1),
    default: z.string().min(1),
    locales: z.record(z.string().min(1), localeDefinitionSchema),
  }),
  organization: z.object({
    name: z.string().min(1),
    legalName: z.string().min(1),
    url: z.string().url(),
    logo: z.string().min(1),
    description: z.string().min(1),
    foundingDate: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    address: z.object({
      street: z.string().min(1),
      city: z.string().min(1),
      region: z.string().min(1),
      postalCode: z.string().min(1),
      country: z.string().min(1),
      countryCode: z.string().min(1),
    }),
  }),
  contact: z.object({
    supportEmail: z.string().email(),
    salesEmail: z.string().email(),
    phoneNumber: z.string().min(1),
  }),
  social: z.record(z.string().min(1), z.string().min(1)),
  images: z.object({
    og: z.string().min(1),
    logo: z.string().min(1),
    ogWidth: z.number().positive(),
    ogHeight: z.number().positive(),
  }),
  icons: z.object({
    favicon: z.string().min(1),
    svg: z.string().min(1),
    appleTouchIcon: z.string().min(1),
  }),
  theme: z.object({
    dark: z.string().min(1),
    light: z.string().min(1),
  }),
  pricing: z.object({
    model: z.string().min(1),
    currency: z.string().min(1),
    minPrice: z.string().min(1),
    maxPrice: z.string().min(1),
  }),
  manifest: z.string().min(1),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
