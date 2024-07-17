import React from "react";
import { Image } from "@nextui-org/image";
import { Card, CardFooter, CardBody } from "@nextui-org/card";

export default function Profile() {
  // create profile page card client component which takes in the user details and 
  // sorts out all the icon switching for dark mode. 
  // (icons will be just social media icons with links to them)
  return (
    <div className="p-4">
      <Card className="max-w-sm w-full rounded-lg shadow-md">
        <CardBody className="overflow-visible py-4">
          <Image
            width={150}
            alt="User Profile Image"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
          <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
          <p className="mt-1 text-sm">johndoe@example.com</p>
          <CardFooter>
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="https://twitter.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/in/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                GitHub
              </a>
            </div>
          </CardFooter>
        </CardBody>
      </Card>
    </div>
  );
}
