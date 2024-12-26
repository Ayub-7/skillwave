import '@/app/ui/global.css';
import { karla } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

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
        <Toaster
          containerStyle={{
            top: 65,
            right: 20,
            zIndex: 9999,
          }}
        />
        <Providers>
          <Script async src="https://cdn.promotekit.com/promotekit.js" data-promotekit="7c7b82ab-2a76-4da0-8a60-fae6713dad6c"></Script>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
