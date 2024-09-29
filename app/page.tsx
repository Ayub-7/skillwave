'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { addEmail } from "@/app/lib/actions";

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const result = await addEmail(email);
      if (result.success) {
        setMessage('Thank you for joining our waitlist!');
        setEmail('');
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const imageStyle = {
    borderRadius: '50%',
    border: '1px solid #fff',
  }


  return (
    <main className="flex min-h-screen flex-col p-6 bg-white text-black">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <Image
            src="/SW-light-sm.png"
            width={70}
            height={70}
            alt="SkillWave logo"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="md:w-1/2">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              The modern platform for{" "}
              <motion.span
                className="text-blue-500"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                course creators
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                🚀
              </motion.span>
            </motion.h1>
            <p className="text-xl mb-8 text-black-300">
              The easiest way to create and sell online courses. Elevate your teaching and simplify your process with Skill Wave.
            </p>

            <div className="bg-blue-900 p-6 rounded-lg mb-8">
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
              <p className="text-lg mb-2">Stay updated on our launch and future offers:</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none bg-white-800 text-white w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-blue-600 transition-colors whitespace-nowrap disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
              {message && (
                <p className={`mt-2 text-sm ${message.includes('Thank you') ? 'text-green-500' : 'text-red-500'}`}>
                  {message}
                </p>
              )}
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
              <source src="https://utfs.io/f/AxBstrLG0jqGzIS5D8uGlEKcfyFvHThAe51SVdYQMqXP3n4x" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div className="py-6 border-t border-black-800">
        <div className="flex justify-center items-center space-x-4">
          <Link href="https://x.com/ali_ayub7" target="_blank" rel="noopener noreferrer">
            <Image
              style={imageStyle}
              src="/App-Logo-Twitter.jpg"
              width={50}
              height={50}
              alt="X logo"
            />
          </Link>
          <Link href="https://buymeacoffee.com/ayubali" target="_blank" rel="noopener noreferrer">
            <Image
              style={imageStyle}
              src="/IXkRaK6Q.png"
              width={50}
              height={50}
              alt="Buy me a coffee logo"
            />
          </Link>
        </div>
      </div>
      <div className='flex justify-center text-black-300'>
        Copyright © 2024 Skill Wave.
      </div>
    </main >
  );
};

export default LandingPage;