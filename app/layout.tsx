import '@/app/ui/global.css';
import { karla } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: {
    template: '%s | skillwave.io',
    default: 'skillwave.io',
  },
  description: 'The official home of skillwave.',
  metadataBase: new URL('https://skillwave.io'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${karla.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
