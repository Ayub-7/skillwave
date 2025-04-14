import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: {
    template: '%s | SkillWave - Course Creation Platform',
    default: 'SkillWave - The Modern Platform for Course Creators',
  },
  description: 'Create, sell, and manage online courses with SkillWave. The easiest platform for course creators with no commission fees, beautiful UI, and powerful tools.',
  metadataBase: new URL('https://skillwave.io'),
  keywords: ['course creation', 'online courses', 'teaching platform', 'e-learning', 'digital courses', 'course marketplace', 'education platform', 'online teaching', 'create course', 'course builder', 'digital products', 'make money online'],
  creator: 'SkillWave',
  publisher: 'SkillWave',
  authors: [{ name: 'SkillWave Team' }],
  alternates: {
    canonical: 'https://skillwave.io',
  },
  openGraph: {
    title: 'SkillWave - The Modern Platform for Course Creators',
    description: 'Create, sell, and manage online courses with SkillWave. The easiest platform for course creators with no commission fees, beautiful UI, and powerful tools.',
    url: 'https://skillwave.io',
    siteName: 'SkillWave',
    images: [
      {
        url: 'https://skillwave.io/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SkillWave - Course Creation Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillWave - The Modern Platform for Course Creators',
    description: 'Create, sell, and manage online courses with SkillWave. The easiest platform for course creators with no commission fees, beautiful UI, and powerful tools.',
    images: ['https://skillwave.io/opengraph-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'verification_token', // Replace with your Google Search Console verification token
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
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
