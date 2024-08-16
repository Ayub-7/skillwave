'use client'
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from "next-themes";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { deleteCourse } from "@/app/lib/actions";
import EditCourseModal from "./edit-course-modal";

// interface CourseCardProps {
//     id: number;
//     title: string;
//     imageUrl: string;
//     price: number;
//     authorId: number;
//     currUserId: number;
// }

export default function CourseCard({ id, course, currUserId }: any) {
    const { theme } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);

    const handleCardPress = () => {
        router.push(`/dashboard/courses/${id}`);
    };

    const courseImage = () => {
        if (!course.imageUrl) {
            return `/SW-${theme}-sm.png`;
        }
        return course.imageUrl;
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditDialogOpen(true);
        console.log("Edit course", id, editDialogOpen);
    };

    const handleDelete = async () => {
        try {
            await deleteCourse(id);
        } catch (error) {
            console.error('Error deleting course:', error);
        };
        console.log("Delete course", id);
    };

    const showDropdown = pathname === '/dashboard/profile' && course.authorId === currUserId;

    return (
        <>
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
                                <DropdownItem key="edit" onClick={handleEdit}>Edit</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger" onClick={handleDelete}>
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
                            className="object-cover rounded-xl"
                            src={courseImage()}
                            width={270}
                        />
                    </CardBody>
                    <CardFooter>
                        <p>${course.price}</p>
                    </CardFooter>
                </div>
            </Card>
            {editDialogOpen && (
                <EditCourseModal
                    course={course}
                    isOpen={editDialogOpen}
                    onClose={() => setEditDialogOpen(false)}
                />
            )
            }
        </>
    );
}