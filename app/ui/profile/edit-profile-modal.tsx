'use client'
import React from "react";
import { updateUser } from "@/app/lib/actions";
import { XIcon } from "@/app/ui/custom-icons/x-icon";
import { TiktokIcon } from "@/app/ui/custom-icons/tiktok-icon";
import { FacebookIcon } from "@/app/ui/custom-icons/facebook-icon";
import { InstagramIcon } from "@/app/ui/custom-icons/instagram-icon";
import { LinkedinIcon } from "@/app/ui/custom-icons/linkedin-icon";
import { YoutubeIcon } from "@/app/ui/custom-icons/youtube-icon";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import { Button } from '@nextui-org/react';
import { Input, Textarea } from "@nextui-org/input";
import { Tooltip } from "@nextui-org/tooltip";
import { UploadButton } from "@/app/lib/uploadthing";
import toast, { Toaster } from 'react-hot-toast';
import { Pencil } from "lucide-react";

export default function EditProfileModal({ user }: any) {
    const [isMobile, setIsMobile] = React.useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [imageUrl, setImageUrl] = React.useState(user.image || '');

    // State for profile details
    const [name, setName] = React.useState(user.name);
    const [bio, setBio] = React.useState(user.bio || '');

    // State for social media links
    const [twitter, setTwitter] = React.useState(user.twitter || '');
    const [instagram, setInstagram] = React.useState(user.instagram || '');
    const [linkedin, setLinkedin] = React.useState(user.linkedin || '');
    const [facebook, setFacebook] = React.useState(user.facebook || '');
    const [tiktok, setTiktok] = React.useState(user.tiktok || '');
    const [youtube, setYoutube] = React.useState(user.youtube || '');

    const isInvalid = React.useMemo(() => name === "", [name]);

    const isInvalidBio = React.useMemo(() => bio.length > 130, [bio]);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleAction = async (onClose: () => void) => {
        onClose();
        try {
            await updateUser({
                id: user.id,
                name: name,
                bio: bio,
                twitter: twitter,
                instagram: instagram,
                linkedin: linkedin,
                facebook: facebook,
                tiktok: tiktok,
                youtube: youtube,
                image: imageUrl,
            });
            toast.success('Profile updated successfully!', {
                duration: 3000,
                position: 'top-right',
                style: {
                    zIndex: 9999,
                },
            });

        } catch (error) {
            toast.error('Error, try again!', {
                duration: 3000,
                position: 'top-right',
                style: {
                    zIndex: 9999,
                },
            });
        };
    }


    return (
        <>
            <Tooltip color="primary" content="Edit Profile">
                <Button onPress={onOpen} variant="shadow" isIconOnly>
                    <Pencil className="w-6 h-6" />
                </Button>
            </Tooltip>
            <Modal disableAnimation scrollBehavior="inside" isDismissable={!isMobile} placement="top-center" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col items-center gap-4">
                                    {imageUrl ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <Image
                                                src={imageUrl}
                                                alt="Profile Picture"
                                                width={150}
                                                height={150}
                                            />
                                            <Button onPress={() => setImageUrl('')}>
                                                Change Image
                                            </Button>
                                        </div>
                                    ) : (
                                        <UploadButton
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                setImageUrl(res[0].url)
                                            }}
                                            onUploadError={(error: Error) => {
                                                // Do something with the error.
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    )}
                                </div>
                                <Input
                                    value={name}
                                    isRequired
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage="Please enter name"
                                    onChange={(e) => setName(e.target.value)}
                                    variant="bordered"
                                    type="string"
                                    label="Name"
                                    classNames={{
                                        input: "text-md",
                                    }}
                                />
                                <Textarea
                                    value={bio}
                                    variant="bordered"
                                    isInvalid={isInvalidBio}
                                    color={isInvalidBio ? "danger" : "default"}
                                    errorMessage="Bio must be less than 130 characters"
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Enter your bio"
                                    type="string"
                                    label="Bio"
                                    classNames={{
                                        input: "bg-transparent border-none focus:ring-0 text-md",
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: "bg-transparent shadow-none",
                                    }}
                                />
                                <Input
                                    value={twitter}
                                    onChange={(e) => setTwitter(e.target.value)}
                                    variant="bordered"
                                    type="string"
                                    label="X"
                                    placeholder="Enter X username"
                                    endContent=<XIcon />
                                    classNames={{
                                        input: "text-md",
                                    }}
                                />
                                <Input
                                    value={tiktok}
                                    onChange={(e) => setTiktok(e.target.value)}
                                    variant="bordered"
                                    type="string"
                                    label="TikTok"
                                    placeholder="Enter TikTok username"
                                    endContent=<TiktokIcon />
                                    classNames={{
                                        input: "text-md",
                                    }}
                                />
                                <Input
                                    value={youtube}
                                    onChange={(e) => setYoutube(e.target.value)}
                                    variant="bordered"
                                    type="string"
                                    label="YouTube"
                                    placeholder="YouTube username i.e @john_doe"
                                    endContent=<YoutubeIcon />
                                    classNames={{
                                        input: "text-md",
                                    }}
                                />
                                <Input
                                    value={instagram}
                                    onChange={(e) => setInstagram(e.target.value)}
                                    variant="bordered"
                                    type="string"
                                    label="Instagram"
                                    placeholder="Enter Instagram username"
                                    endContent=<InstagramIcon />
                                    classNames={{
                                        input: "text-md",
                                    }}
                                />
                                <Input
                                    value={facebook}
                                    onChange={(e) => setFacebook(e.target.value)}
                                    variant="bordered"
                                    type="string"
                                    label="Facebook"
                                    placeholder="Enter Facebook username"
                                    endContent=<FacebookIcon />
                                    classNames={{
                                        input: "text-md",
                                    }}
                                />
                                <Input
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                    variant="bordered"
                                    type="string"
                                    label="LinkedIn"
                                    placeholder="Enter LinkedIn username"
                                    endContent=<LinkedinIcon />
                                    classNames={{
                                        input: "text-md",
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    isDisabled={isInvalid || isInvalidBio}
                                    onPress={() => handleAction(onClose)}
                                >
                                    Save
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}