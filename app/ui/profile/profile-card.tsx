import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Card, CardFooter, CardBody } from "@nextui-org/card";
import { XIcon } from "@/app/ui/custom-icons/x-icon";
import { TiktokIcon } from "@/app/ui/custom-icons/tiktok-icon";
import { FacebookIcon } from "@/app/ui/custom-icons/facebook-icon";
import { InstagramIcon } from "@/app/ui/custom-icons/instagram-icon";
import { LinkedinIcon } from "@/app/ui/custom-icons/linkedin-icon";
import { YoutubeIcon } from "@/app/ui/custom-icons/youtube-icon";
import { PencilIcon } from '@heroicons/react/24/outline';
import { getSession } from "@/app/lib/data"

export default async function ProfileCard() {
    // Make links smaller and put them in the top left corner of the card to shrink over all card size
    const session = await getSession() || '';
    const JsonSession = JSON.parse(session)
    return (
        <div className="p-4">
            <Card className="max-w-lg w-full md:max-w-xl rounded-lg shadow-md">
                <div className="absolute top-2 right-2 md:top-4 md:right-4">
                    <Button variant="shadow" isIconOnly>
                        <PencilIcon className="w-6 h-6" />
                    </Button>
                </div>
                <CardBody className="overflow-visible flex flex-col items-center py-4">
                    <Image
                        width={150}
                        alt="User Profile Image"
                        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                        className="rounded-full"
                    />
                    <h2 className="mt-4 text-xl font-semibold text-center">{JsonSession.user.name}</h2>
                    <p className="mt-1 text-sm text-center">
                        Software Developer passionate about creating meaningful applications.
                        I want to give you all the tools to be great. Lets Go!
                    </p>
                    <CardFooter className="mt-4 flex justify-center space-x-4">
                        <a
                            href="https://x.com/johndoe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                        >
                            <XIcon />
                        </a>
                        <a
                            href="https://tiktok.com/johndoe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                        >
                            <TiktokIcon />
                        </a>
                        <a
                            href="https://youtube.com/johndoe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                        >
                            <YoutubeIcon />
                        </a>
                        <a
                            href="https://instagram.com/johndoe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                        >
                            <InstagramIcon />
                        </a>
                        <a
                            href="https://linkedin.com/in/johndoe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                        >
                            <LinkedinIcon />
                        </a>
                        <a
                            href="https://facebook.com/johndoe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600"
                        >
                            <FacebookIcon />
                        </a>
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    );
}