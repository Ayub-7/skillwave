import { Image } from "@nextui-org/image";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import { Button } from "@nextui-org/button";


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-black">
      <div className="flex justify-between items-center">
        <Image
          src={`/SW-dark-sm.png`}
          width={100}
          // height={32}
          alt="SW logo"
          radius="none"
        />
      </div>
      <div className="py-8 px-4 text-center mb-12">
        <h1 className={`text-3xl md:text-5xl font-bold text-white`}>
          Early Access Offer: Lifetime Membership
        </h1>
      </div>
      <div className="flex grow flex-col items-center justify-center">
        <Link
          href="https://buy.stripe.com/test_9AQeWyc3M3fY4BafYY"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-400"
        >
          <span>Get Lifetime Access</span> <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>
    </main>
  );
}