import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AppShowcase from '@/app/ui/dashboard/app-showcase';
import NavBar from '@/app/ui/dashboard/navbar';
import EmailList from '@/app/ui/emailList';
import { AnimatedHeading } from '@/app/ui/animatedHeading';

const LandingPage = () => {
  const imageStyle = {
    borderRadius: '50%',
    border: '1px solid #fff',
  }


  return (
    <div>
      <NavBar />
      <main className="flex min-h-screen flex-col p-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="md:w-1/2">
              <AnimatedHeading />
              <p className="text-xl mb-8">
                The easiest way to create and sell online courses. Elevate your teaching and simplify your process with Skill Wave.
              </p>

              <div className="bg-blue-800 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold mb-2 text-white">🎉 Limited Time Offer</h2>
                <p className="text-lg mb-4 text-white">Get lifetime access to Skill Wave at an unbeatable price!</p>
                <Link
                  href="https://buy.stripe.com/fZe4iz8zadrOa5ieUU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-600"
                >
                  <span>Get Lifetime Access Now</span> <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>

              <div className="mb-6">
                <EmailList />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-center text-2xl font-bold mb-4">Demo ⬇️</h2>
              <video
                className="rounded-lg w-full h-auto"
                controls
                autoPlay
                muted
                loop
              >
                <source src="https://utfs.io/f/AxBstrLG0jqG8sZl6A85ICRvGg5y6jnUxlXNYk4wcSPBHeAQ" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <AppShowcase />

        <div className="py-6">
          <div className="flex justify-center items-center space-x-4">
            <Link href="https://x.com/skillwaveio" target="_blank" rel="noopener noreferrer">
              <Image
                style={imageStyle}
                src="/App-Logo-Twitter.jpg"
                width={50}
                height={50}
                alt="X logo"
              />
            </Link>
          </div>
        </div>
        <div className='flex justify-center text-black-300'>
          Copyright © 2024 Skill Wave.
        </div>
      </main >
    </div>
  );
};

export default LandingPage;