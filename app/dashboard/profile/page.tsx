import React from "react";
import { Image } from "@nextui-org/image";
import { Card, CardFooter, CardBody } from "@nextui-org/card";

export default function Profile() {
  return (
    <div className="p-4">
      <Card className="max-w-sm w-full rounded-lg shadow-md bg-white">
        <CardBody className="overflow-visible py-4">
          <Image
            width={150}
            alt="User Profile Image"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h2>
          <p className="mt-1 text-sm text-gray-500">johndoe@example.com</p>
          <CardFooter>
            <div className="mt-4 flex justify-center space-x-4">
              <a
                href="https://twitter.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/in/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
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
