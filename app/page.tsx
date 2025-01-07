import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@nextui-org/react";
import AppShowcase from '@/app/ui/dashboard/app-showcase';
import NavBar from '@/app/ui/dashboard/navbar';
import { AnimatedHeading } from '@/app/ui/animatedHeading';
import SubscriptionCards from "@/app/ui/subscriptionCards";
import ThemeBadge from "@/app/ui/themeBadge";

const LandingPage = () => {

  const imageStyle = {
    borderRadius: '50%',
    border: '1px solid #fff',
  }
  const pricingOptions = {
    monthly: {
      price: 35,
      priceId: process.env.NODE_ENV === "production" ? process.env.PRICE_ID_PROD : process.env.PRICE_ID_DEV,
      description: "per month"
    },
    yearly: {
      price: 320,
      priceId: process.env.NODE_ENV === "production" ? process.env.PRICE_ID_YEARLY_PROD : process.env.PRICE_ID_YEARLY_DEV,
      description: "per year"
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center mt-4">
        <ThemeBadge />
      </div>
      <main className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="mb-20 mt-10">
          <div className="max-w-7xl mx-auto text-center px-6">
            <AnimatedHeading />
            <p className="text-lg sm:text-xl mt-4">
              Transform your passion into profit with the easiest platform to create and sell online courses.
            </p>

          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Skill Wave?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                <h3 className="font-bold text-xl mb-4">Easy Course Creation</h3>
                <p>Create professional courses effortlessly with our intuitive tools.</p>
              </div>
              <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                <h3 className="font-bold text-xl mb-4">Integrated Payments</h3>
                <p>Start earning immediately with seamless payment integrations.</p>
              </div>
              <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                <h3 className="font-bold text-xl mb-4">Analytics</h3>
                <p>Gain insights into your sales and student engagement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* App Showcase Section */}
        <section>
          <AppShowcase />
        </section>

        {/* Pricing Section */}
        <section>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Simple Pricing Plans</h2>
            <SubscriptionCards user={null} pricingOptions={pricingOptions} />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="mb-6">
              <Link href="https://x.com/skillwaveio" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/App-Logo-Twitter.jpg"
                  width={50}
                  height={50}
                  style={imageStyle}
                  alt="Skill Wave Logo"
                  className="inline-block"
                />
              </Link>
            </div>
            <p className="text-sm">
              Copyright © 2025 Skill Wave. All rights reserved.
            </p>
            {/* <div className="mt-4">
              <Link href="/terms" className="text-gray-400 hover:text-white mx-2">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white mx-2">
                Privacy Policy
              </Link>
            </div> */}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;
