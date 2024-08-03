import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { XIcon } from "@/app/ui/custom-icons/x-icon";
import { TiktokIcon } from "@/app/ui/custom-icons/tiktok-icon";
import { FacebookIcon } from "@/app/ui/custom-icons/facebook-icon";
import { InstagramIcon } from "@/app/ui/custom-icons/instagram-icon";
import { LinkedinIcon } from "@/app/ui/custom-icons/linkedin-icon";
import { YoutubeIcon } from "@/app/ui/custom-icons/youtube-icon";
import { getSession, getUser } from "@/app/lib/data";
import EditProfileModal from "@/app/ui/profile/edit-profile-modal";

export default async function ProfileCard() {
    const session = await getSession() || '';
    const JsonSession = JSON.parse(session);
    const user = await getUser(JsonSession.user.id)

    return (
        <div className="pt-0">
            <Card className="max-w-sm w-full md:max-w-sm rounded-lg shadow-md relative">
                <CardHeader className="flex justify-between items-center">
                    <div className="flex">
                        <a
                            href="https://x.com/johndoe1"
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
                    </div>
                    <div className="flex">
                        <EditProfileModal user={user} />
                    </div>
                </CardHeader>
                <CardBody className="overflow-visible flex flex-col items-center py-4">
                    <Image
                        width={90}
                        alt="User Profile Image"
                        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                    />
                    <h2 className="mt-4 text-xl font-semibold text-center">{user?.name}</h2>
                    <p className="mt-1 text-sm text-center">
                        {user?.bio}
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}
