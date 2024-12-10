'use client'
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import Link from 'next/link';
import { deleteCourse, publishCourse, draftCourse } from "@/app/lib/actions";
import toast from 'react-hot-toast';

export default function CourseCard({ id, course, user, currUserId }: any) {
    const { theme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [publishDialogOpen, setPublishDialogOpen] = React.useState(false);
    const [draftDialogOpen, setDraftDialogOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleCardPress = () => {
        router.push(`/dashboard/courses/${id}`);
    };

    const courseImage = () => {
        if (!course.imageUrl) {
            return `/SW-${theme}-sm.png`;
        }
        return course.imageUrl;
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteDialogOpen(true);
    };

    const handlePublishClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!user.stripeConnectedLinked) {
            router.push('/dashboard/billing');
        } else {
            setPublishDialogOpen(true);
        }
    };

    const handleDraftClick = (e: React.MouseEvent) => {
        e.stopPropagation();
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


    return (
        <>
            <Card className="py-2 relative max-w-[250px]" isPressable>
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
                                    <Bars3Icon className="h-5 w-5" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Course actions">
                                {course.status === "DRAFT" ? (
                                    <DropdownItem key="publish" className="text-success" color="success" onClick={handlePublishClick}>
                                        Publish
                                    </DropdownItem>
                                ) : (
                                    <DropdownItem key="draft" className="text-warning" color="warning" onClick={handleDraftClick}>
                                        Set As Draft
                                    </DropdownItem>
                                )}
                                <DropdownItem key="edit" onClick={() => router.push(`/dashboard/courses/${course.id}/edit`)}>Edit</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleDeleteClick}>
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
                <div onClick={handleCardPress}>
                    <CardHeader className="pb-0 pt-1 px-3 flex-col items-start">
                        <h4 className="font-bold text-md">{course.name}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-1">
                        <Image
                            alt="Card background"
                            src={courseImage()}
                            width={230} // Reduced width
                            height={175}
                            radius="sm"
                        />
                    </CardBody>
                    <CardFooter className="text-small">
                        <div className="flex flex-col w-full">
                            <div className="flex justify-between w-full">
                                <div>${course.price}</div>
                                {course.students > 0 && (
                                    <div className="flex">
                                        <UserIcon className="h-4 w-4" />
                                        {course.students.toLocaleString()}
                                    </div>
                                )}
                            </div>
                            {onHomepage && (
                                <p className="text-left">
                                    <Link
                                        href={`/dashboard/profile/${course.author.id}`}
                                        className="text-blue-500 hover:underline focus:outline-none"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {`By ${course.author.name}`}
                                    </Link>
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