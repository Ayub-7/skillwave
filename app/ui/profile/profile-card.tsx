'use client'
import { Image } from "@nextui-org/image";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { XIcon } from "@/app/ui/custom-icons/x-icon";
import { TiktokIcon } from "@/app/ui/custom-icons/tiktok-icon";
import { FacebookIcon } from "@/app/ui/custom-icons/facebook-icon";
import { InstagramIcon } from "@/app/ui/custom-icons/instagram-icon";
import { LinkedinIcon } from "@/app/ui/custom-icons/linkedin-icon";
import { YoutubeIcon } from "@/app/ui/custom-icons/youtube-icon";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import EditProfileModal from "@/app/ui/profile/edit-profile-modal";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from 'next/navigation';

export default function ProfileCard({ user }: any) {
    const router = useRouter();

    return (
        <div className="pt-0">
            <Card className="max-w-sm w-full md:max-w-sm rounded-lg shadow-md relative">
                <CardHeader className="flex justify-between items-center">
                    <div className="flex">
                        {user?.twitter && (
                            <a
                                href={`https://x.com/${user?.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                            >
                                <XIcon />
                            </a>
                        )}
                        {user?.tiktok && (
                            <a
                                href={`https://tiktok.com/${user?.tiktok}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                            >
                                <TiktokIcon />
                            </a>
                        )}
                        {user?.youtube && (
                            <a
                                href={`https://youtube.com/${user?.youtube}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                            >
                                <YoutubeIcon />
                            </a>
                        )}
                        {user?.instagram && (
                            <a
                                href={`https://instagram.com/${user?.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                            >
                                <InstagramIcon />
                            </a>
                        )}
                        {user?.linkedin && (
                            <a
                                href={`https://linkedin.com/in/${user?.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                            >
                                <LinkedinIcon />
                            </a>
                        )}
                        {user?.facebook && (
                            <a
                                href={`https://facebook.com/${user?.facebook}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                            >
                                <FacebookIcon />
                            </a>
                        )}
                    </div>
                    <div className="flex gap-1">
                        <Tooltip color="primary" content="Create Course">
                            <Button
                                onClick={() => router.push('/dashboard/courses/create')}
                                variant="shadow"
                                isIconOnly
                            >
                                <PlusIcon className="w-6 h-6" />
                            </Button>
                        </Tooltip>
                        <EditProfileModal user={user} />
                    </div>
                </CardHeader>
                <CardBody className="overflow-visible flex flex-col items-center py-4">
                    {user?.imageUrl ? (
                        <Image
                            width={90}
                            alt="User Profile Image"
                            src={user?.imageUrl}
                        />
                    ) : (
                        <Image
                            width={90}
                            alt="User Profile Image"
                            src="/default-profile-image.png"
                        />
                    )}
                    <h2 className="mt-4 text-xl font-semibold text-center">{user?.name}</h2>
                    <p className="mt-1 text-sm text-center">
                        {user?.bio}
                    </p>
                </CardBody>
            </Card>
        </div >
    );
}
