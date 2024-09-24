import React from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-black text-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-16">
          <Image
            src="/SW-dark-sm.png"
            width={80}
            height={80}
            alt="SkillWave logo"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              The modern platform for <span className="text-blue-500">course creators</span>🚀
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              The easiest way to create and sell online courses. Elevate your teaching and simplify your process with SkillWave.
            </p>

            <div className="bg-blue-900 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-2">🎉 Limited Time Offer</h2>
              <p className="text-lg mb-4">Get lifetime access to SkillWave at an unbeatable price!</p>
              <Link
                href="https://buy.stripe.com/test_9AQeWyc3M3fY4BafYY"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-600"
              >
                <span>Get Lifetime Access Now</span> <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>

            <div className="mb-6">
              <p className="text-lg mb-2">Stay updated on our launch and future offers:</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-3 rounded-l-lg bg-gray-800 text-white w-full"
                />
                <button className="bg-blue-500 text-white px-6 py-3 rounded-r-lg hover:bg-blue-600 transition-colors whitespace-nowrap">
                  Join Waitlist
                </button>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-400">
              <p>✅ No credit card required for waitlist</p>
              <p>✅ 14-day free trial with lifetime access</p>
              <p>✅ Cancel anytime</p>
            </div>
          </div>
          <div className="md:w-1/2">
            <video
              className="rounded-lg w-full h-auto"
              controls
              autoPlay
              muted
              loop
            >
              <source src="https://utfs.io/f/AxBstrLG0jqGzIS5D8uGlEKcfyFvHThAe51SVdYQMqXP3n4x" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;