import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardFooter, CardHeader, Button } from "@nextui-org/react";
import AppShowcase from '@/app/ui/dashboard/app-showcase';
import NavBar from '@/app/ui/dashboard/navbar';
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

              <Card className="mb-8">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h2 className="text-large font-bold">Skill Wave Creator</h2>
                  <p className="text-tiny uppercase font-bold">Flexible Plans</p>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <div className="flex items-baseline space-x-2 mb-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li>✅ Unlimited Course Creation</li>
                    <li>✅ Student Management</li>
                    <li>✅ Advanced Analytics</li>
                    <li>✅ Payment Integration</li>
                  </ul>
                </CardBody>
                <CardFooter>
                  <Button
                    as={Link}
                    href="https://buy.stripe.com/fZe4iz8zadrOa5ieUU"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    className="w-full"
                  >
                    Start Now!
                  </Button>
                </CardFooter>
              </Card>
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
      </main>
    </div>
  );
};

export default LandingPage;