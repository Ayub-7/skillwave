'use client'
import { Image } from "@nextui-org/image";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { XIcon } from "@/app/ui/custom-icons/x-icon";
import { TiktokIcon } from "@/app/ui/custom-icons/tiktok-icon";
import { FacebookIcon } from "@/app/ui/custom-icons/facebook-icon";
import { InstagramIcon } from "@/app/ui/custom-icons/instagram-icon";
import { LinkedinIcon } from "@/app/ui/custom-icons/linkedin-icon";
import { YoutubeIcon } from "@/app/ui/custom-icons/youtube-icon";
import { Button } from "@nextui-org/button";
import EditProfileModal from "@/app/ui/profile/edit-profile-modal";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from 'next/navigation';
import { PlusCircle } from "lucide-react";

type ProfileCardProps = {
    canEdit: boolean;
    user: any;
};

export default function ProfileCard({ canEdit, user }: ProfileCardProps) {
    const router = useRouter();

    const getDisplayName = () => {
        if (user?.name) return user.name;
        return user.email.split('@')[0];
    };

    return (
        <Card className="w-80 rounded-lg shadow-md relative">
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
                {canEdit && (
                    <div className="flex gap-1">
                        <Tooltip color="primary" content="Create Course">
                            <Button
                                onClick={() => !user.subscription ? router.push('/dashboard/billing') : router.push('/dashboard/courses/create')}
                                variant="shadow"
                                isIconOnly
                            >
                                <PlusCircle className="w-6 h-6" />
                            </Button>
                        </Tooltip>
                        <EditProfileModal user={user} />
                    </div>
                )}
            </CardHeader>
            <CardBody className="overflow-visible flex flex-col items-center py-4">
                {user?.image !== '' && user?.image !== null ? (
                    <Image
                        width={90}
                        alt="User Profile Image"
                        src={user?.image}
                    />
                ) : (
                    <Image
                        width={90}
                        alt="User Profile Image"
                        src="/default-profile-image.png"
                    />
                )}
                <h2 className="mt-4 text-xl font-semibold text-center">{getDisplayName()}</h2>
                <p className="mt-2 text-sm text-center  max-w-xs px-6">
                    {user?.bio || "This user hasn't added a bio yet."}
                </p>
            </CardBody>
        </Card>
    );
}
