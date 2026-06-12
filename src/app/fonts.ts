import { Fredoka } from 'next/font/google';

export const fontSans = Fredoka({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});
