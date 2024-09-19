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
import { deleteCourse } from "@/app/lib/actions";
import toast, { Toaster } from 'react-hot-toast';

export default function CourseCard({ id, course, currUserId }: any) {
    const { theme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
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

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            await deleteCourse(id);
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

    const showDropdown = pathname === '/dashboard/profile' && course.authorId === currUserId;

    return (
        <>
            <Toaster
                containerStyle={{
                    top: 65,
                    right: 20,
                    zIndex: 9999,
                }}
            />
            <Card className="py-4 relative" isPressable>
                <div className="absolute top-2 right-2 z-10">
                    {showDropdown && (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <Bars3Icon className="h-5 w-5" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Course actions">
                                <DropdownItem key="edit" onClick={() => router.push(`/dashboard/courses/${course.id}/edit`)}>Edit</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleDeleteClick}>
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
                <div onClick={handleCardPress}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <h4 className="font-bold text-large">{course.name}</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible py-2">
                        <Image
                            alt="Card background"
                            src={courseImage()}
                            width={275}
                            height={210}
                            radius="sm"
                        />
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-between w-full">
                            <div>${course.price}</div>
                            {course.students > 0 && (
                                <div className="flex"><UserIcon className="h-5 w-5" />{course.students.toLocaleString()}</div>
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
        </>
    );
}