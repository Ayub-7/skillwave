import Image from 'next/image';
import Link from 'next/link';
import { BsStripe } from "react-icons/bs";
import AppShowcase from '@/app/ui/dashboard/app-showcase';
import NavBar from '@/app/ui/dashboard/navbar';
import { AnimatedHeading } from '@/app/ui/animatedHeading';
import SubscriptionCards from "@/app/ui/subscriptionCards";
import ThemeBadge from "@/app/ui/themeBadge";
import AvatarCTA from '@/app/ui/avatarCTA';

const LandingPage = () => {

  const imageStyle = {
    borderRadius: '50%',
    border: '1px solid #fff',
  }
  const pricingOptions = {
    monthly: {
      price: 25,
      priceId: process.env.NODE_ENV === "production" ? process.env.PRICE_ID_PROD : process.env.PRICE_ID_DEV,
      description: "per month"
    },
    yearly: {
      price: 200,
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
        <section className="mb-12 mt-10">
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
            <div className='flex justify-center mb-12'>
              <AvatarCTA />
            </div>

            {/* Testimonial Section */}
            <div className="mb-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full relative">
                      <Image
                        src={'/face2.png'}
                        width={48}
                        height={48}
                        alt="Graphic Design Teacher"
                        className="rounded-full w-full h-full object-cover ring-2 ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <p className="text-base font-medium">Graphic Design Teacher</p>
                    </div>
                  </div>
                  <blockquote className="text-sm italic">
                    &quot;Skillwave.io made selling my Photoshop courses a breeze. Love how simple everything is, and I get to <span className="font-semibold text-blue-500 dark:text-blue-400">keep more of what I earn</span>!&quot;
                  </blockquote>
                </div>

                <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full relative">
                      <Image
                        src={'https://utfs.io/f/AxBstrLG0jqGfgeRyqYApzBaj7YsVFWEH3QqdZU5v9I2y8f0'}
                        width={48}
                        height={48}
                        alt="Coding Course Creator"
                        className="rounded-full w-full h-full object-cover ring-2 ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <p className="text-base font-medium">Coding Course Creator</p>
                    </div>
                  </div>
                  <blockquote className="text-sm italic">
                    &quot;Finally, a platform that <span className="font-semibold text-blue-500 dark:text-blue-400">doesn&apos;t take a huge cut</span>! Setting up my coding courses was <span className="font-semibold text-blue-500 dark:text-blue-400">super quick</span>, and my students love it.&quot;
                  </blockquote>
                </div>

                <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full relative">
                      <Image
                        src={'/face1.png'}
                        width={48}
                        height={48}
                        alt="Public Speaking Coach"
                        className="rounded-full w-full h-full object-cover ring-2 ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <p className="text-base font-medium">Public Speaking Coach</p>
                    </div>
                  </div>
                  <blockquote className="text-sm italic">
                    &quot;Perfect for my public speaking courses. <span className="font-semibold text-blue-500 dark:text-blue-400">No tech headaches</span>, just smooth sailing. My students can focus on learning, and so can I.&quot;
                  </blockquote>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Skill Wave?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                <h3 className="font-bold text-xl mb-4">Easy Course Creation ⚡</h3>
                <p>Create professional courses effortlessly with our intuitive tools.</p>
              </div>
              <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  Stripe Integration <BsStripe className="text-[#635BFF] h-6 w-6" />
                </h3>
                <p>Start earning instantly with our seamless Stripe payment integration.</p>
              </div>
              <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                <h3 className="font-bold text-xl mb-4">Analytics 📈</h3>
                <p>Gain insights into your sales and student engagement.</p>
              </div>
              <div className="p-6 rounded-lg shadow-lg dark:bg-neutral-900 dark:shadow-gray-700/30">
                <h3 className="font-bold text-xl mb-4">Affiliate Program 💰</h3>
                <p>Refer creators to skillwave.io and earn a 40% commission for life.</p>
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
              Copyright © 2025 skillwave.io All rights reserved.
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
