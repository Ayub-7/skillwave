'use client'
import React from "react";
import { updateUser } from "@/app/lib/actions";
import { PencilIcon } from '@heroicons/react/24/outline';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from '@nextui-org/react';
import { Input, Textarea } from "@nextui-org/input";

export default function EditProfileModal({ user }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = React.useState(user.name);
    const [bio, setBio] = React.useState(user.bio || '');

    const isInvalid = React.useMemo(() => name === "", [name]);

    // Handler function for the Action button
    const handleAction = async (onClose: () => void) => {
        onClose();
        try {
            await updateUser({
                id: user.id,
                name: name,
                bio: bio,
            });
        } catch (error) {
            console.error('Error updating user:', error);
        };
        console.log('done')
    }

    return (
        <>
            <Button onPress={onOpen} variant="shadow" isIconOnly>
                <PencilIcon className="w-6 h-6" />
            </Button>
            <Modal placement="top-center" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Edit Profile</ModalHeader>
                            <ModalBody>
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
                                />
                                <Textarea
                                    value={bio}
                                    variant="bordered"
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Enter your description"
                                    type="string"
                                    label="Bio"
                                    classNames={{
                                        input: "bg-transparent border-none focus:ring-0",
                                        innerWrapper: "bg-transparent",
                                        inputWrapper: "bg-transparent shadow-none",
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    isDisabled={isInvalid}
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