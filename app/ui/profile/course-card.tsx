'use client'
import React, { useState } from "react";
import { Image } from "@heroui/image";
import NextImage from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Spinner } from "@heroui/spinner";
import { LucideMenu, UserRound } from "lucide-react";
import { Button } from "@heroui/button";
import { deleteCourse, publishCourse, draftCourse } from "@/app/lib/actions";
import toast from 'react-hot-toast';
import { cn } from "@/app/lib/utils";

export default function CourseCard({ id, course, user, currUserId }: any) {
    const { theme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [publishDialogOpen, setPublishDialogOpen] = React.useState(false);
    const [draftDialogOpen, setDraftDialogOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleCardPress = () => {
        setIsClicked(true);
        router.push(`/dashboard/courses/${id}`);
    };

    const getDisplayName = () => {
        if (course.author.name) return course.author.name;
        return course.author.email.split('@')[0];
    };

    const courseImage = () => {
        if (!course.imageUrl) {
            return `/SW-${theme}-sm.png`;
        }
        return course.imageUrl;
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handlePublishClick = () => {
        if (!user.stripeConnectedLinked || !user.subscription) {
            router.push('/dashboard/billing');
        } else {
            setPublishDialogOpen(true);
        }
    };

    const handleDraftClick = () => {
        setDraftDialogOpen(true);
    };

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            await deleteCourse(id, course.authorId);
            setIsLoading(false)
            setDeleteDialogOpen(false);
            toast.success('Course deleted successfully!', {
                duration: 3000,
                position: 'top-right',
                style: {
                    zIndex: 9999,
                },
            });
        } catch (error) {
            setIsLoading(false)
            toast.error('Error, try again!', {
                duration: 3000,
                position: 'top-right',
                style: {
                    zIndex: 9999,
                },
            });
        }
    };

    const handlePublish = async () => {
        setIsLoading(true)
        try {
            await publishCourse(id, course.authorId);
            setIsLoading(false)
            setPublishDialogOpen(false);
            toast.success('Course published successfully!', {
                duration: 3000,
                position: 'top-right',
                style: {
                    zIndex: 9999,
                },
            });
        } catch (error) {
            setIsLoading(false)
            toast.error('Error, try again!', {
                duration: 3000,
                position: 'top-right',
                style: {
                    zIndex: 9999,
                },
            });
        }
    };

    const handleDraft = async () => {
        setIsLoading(true)
        try {
            await draftCourse(id, course.authorId);
            setIsLoading(false)
            setDraftDialogOpen(false);
            toast.success('Course is now drafted!', {
                duration: 3000,
                position: 'top-right',
                style: {
                    zIndex: 9999,
                },
            });
        } catch (error) {
            setIsLoading(false)
            toast.error('Error, try again!', {
                duration: 3000,
                position: 'top-right',
                style: {
                    zIndex: 9999,
                },
            });
        }
    };

    const showDropdown = pathname === `/dashboard/profile/${currUserId}` && course.authorId === currUserId;
    const onHomepage = !pathname.includes('profile');
    const statusColor = course.status === "DRAFT" ? "orange" : "green";
    const computeStripeStatus = () => {
        if (!pathname.includes('profile') || course.authorId !== currUserId) return { notConnected: false, noSubscription: false };
        return {
            notConnected: !user.stripeConnectedLinked,
            noSubscription: !user.subscription
        };
    };

    const { notConnected, noSubscription } = computeStripeStatus();


    return (
        <>
            <Card
                className={cn(
                    "py-2 relative max-w-[250px] transition-all duration-200",
                    isClicked && "opacity-70"
                )}
                onPress={handleCardPress}
                isPressable
            >
                {isClicked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 z-50 rounded-lg">
                        <Spinner size="lg" />
                    </div>
                )}
                {showDropdown && (
                    <div className="absolute top-2 left-1 z-10">
                        <div
                            className={`w-2 h-2 rounded-full ${statusColor === "orange" ? "bg-orange-500" : "bg-green-500"}`}
                            title={course.status}
                        />
                    </div>
                )}
                <div className="absolute top-2 right-2 z-10">
                    {showDropdown && (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <LucideMenu className="h-5 w-5" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Course actions">
                                {course.status === "DRAFT" ? (
                                    <>
                                        {noSubscription ? (
                                            <DropdownItem key="publish" className="text-success" color="success"
                                                description="You need a subscription to publish courses"
                                                isDisabled>
                                                Publish
                                            </DropdownItem>
                                        ) : notConnected ? (
                                            <DropdownItem key="publish" className="text-success" color="success"
                                                description="You need to connect your Stripe account to publish courses"
                                                isDisabled>
                                                Publish
                                            </DropdownItem>
                                        ) : (
                                            <DropdownItem key="publish" className="text-success" color="success" onPress={handlePublishClick}>
                                                Publish
                                            </DropdownItem>
                                        )}
                                    </>
                                ) : (
                                    <DropdownItem key="draft" className="text-warning" color="warning" onPress={handleDraftClick}>
                                        Set As Draft
                                    </DropdownItem>
                                )}
                                <DropdownItem key="edit" onPress={() => router.push(`/dashboard/courses/${course.id}/edit`)}>Edit</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger" onPress={handleDeleteClick}>
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
                <div>
                    <CardHeader className="pb-0 pt-1 px-3 flex-col items-start">
                        <h4 className="font-bold text-md">{course.name}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-1">
                        <Image
                            alt="Card background"
                            as={NextImage}
                            src={courseImage()}
                            width={230} // Reduced width
                            height={175}
                            radius="sm"
                        />
                    </CardBody>
                    <CardFooter className="text-small">
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between w-full">
                                <div><b>{course.price === 0 ? 'Free' : `$${course.price}`}</b></div>
                                {course.students > 0 && (
                                    <div className="flex">
                                        <UserRound className="h-4 w-4" />
                                        <b>{course.students.toLocaleString()}</b>
                                    </div>
                                )}
                            </div>
                            {onHomepage && (
                                <p className="text-left">
                                    {`By ${getDisplayName()}`}
                                </p>
                            )}
                        </div>
                    </CardFooter>
                </div>
            </Card>
            <Modal isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} disableAnimation>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this course? This action cannot be undone.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" variant="light" onPress={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="danger" onPress={handleDelete}>
                            {isLoading ? <Spinner color="white" /> : 'Delete'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={publishDialogOpen} onClose={() => setPublishDialogOpen(false)} disableAnimation>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Publish Course</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to publish this course? This course will now be visible on your
                            profile and homepage.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" variant="light" onPress={() => setPublishDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="success" onPress={handlePublish}>
                            {isLoading ? <Spinner color="white" /> : 'Publish'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={draftDialogOpen} onClose={() => setDraftDialogOpen(false)} disableAnimation>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Draft Course</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to set this course to draft? It will no longer be visible on your profile and homepage.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" variant="light" onPress={() => setDraftDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button color="warning" onPress={handleDraft}>
                            {isLoading ? <Spinner color="white" /> : 'Draft'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}