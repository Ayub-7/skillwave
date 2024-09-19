'use client'
import React, { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Spinner } from "@nextui-org/spinner";
import { Input, Textarea } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import { UploadButton } from "@/app/lib/uploadthing";
import { deleteSection, updateCourse } from "@/app/lib/actions";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import Tiptap from "@/app/components/tiptap";
import toast, { Toaster } from 'react-hot-toast';

interface Section {
    id?: number;
    name: string;
    description: string;
    videoUrl?: string;
    isVideoUploading?: boolean;
}

export default function EditCourseModal({ course }: any) {
    const [name, setName] = React.useState(course.name);
    const [description, setDescription] = React.useState(course.description);
    const [price, setPrice] = React.useState(course.price);
    const [items, setItems] = React.useState<Section[]>(
        course.Sections.map((section: Section) => ({ ...section, isVideoUploading: false }))
    );
    const [isLoading, setIsLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState(course.imageUrl || '');
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);


    const handleDescriptionChange = (index: number, newDescription: string) => {
        const newItems = [...items];
        newItems[index].description = newDescription;
        setItems(newItems);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newItems = [...items];
        if (name === 'name') {
            newItems[index][name] = value;
            setItems(newItems);
        }
    };

    const handleVideoUpload = (index: number, url: string, isUploading: boolean) => {
        const newItems = [...items];
        newItems[index].videoUrl = url;
        newItems[index].isVideoUploading = isUploading;
        setItems(newItems);
    };

    const isInvalidName = React.useMemo(() => name === "", [name]);
    const isInvalidPrice = React.useMemo(() => price === "", [price]);

    const isFormValid = React.useMemo(() => {
        return name !== '' &&
            price !== '' &&
            items.every(item => item?.name !== '');
    }, [name, price, items]);

    const formValidationMessage = React.useMemo(() => {
        if (name === '') {
            console.log('Course name is required')
            return "Course name is required";
        }
        if (price === '') return "Price is required";
        if (items.some(item => item?.name === '')) return "All section names are required";
        return "";
    }, [name, price, items]);

    const handleAddItem = () => {
        setItems([...items, { name: '', description: '', videoUrl: '' }]);
    };

    const handleRemoveItem = async (index: number) => {
        const itemToRemove = items[index];
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
        if (itemToRemove.id) {
            await deleteSection(itemToRemove.id);
        }
        setDeleteDialogOpen(false)
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDeleteDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;
        setIsLoading(true);
        try {
            await updateCourse(course.id, {
                name,
                description,
                price: parseFloat(price),
                authorId: course.authorId,
                imageUrl,
            }, items);
            toast.success('Course updated successfully!', {
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
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div>
            <Toaster
                containerStyle={{
                    top: 65,
                    right: 20,
                    zIndex: 9999,
                }}
            />
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8 rounded-lg shadow-2xl dark:shadow-2xl bg-white dark:bg-neutral-900 shadow-gray-300/50 dark:shadow-gray-700/30">
                <h2 className="text-3xl font-bold mb-6 text-center">Edit Course</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Input
                            value={name}
                            isRequired
                            color={isInvalidName ? "danger" : "default"}
                            errorMessage={isInvalidName && "Please enter name"}
                            onChange={(e) => setName(e.target.value)}
                            variant="bordered"
                            type="string"
                            label="Name"
                            isDisabled={isLoading}
                        />
                        <Input
                            value={price}
                            isRequired
                            type="number"
                            color={isInvalidPrice ? "danger" : "default"}
                            errorMessage={isInvalidPrice && "Please enter price"}
                            variant="bordered"
                            placeholder="Price"
                            onChange={(e) => setPrice(e.target.value)}
                            isDisabled={isLoading}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">$</span>
                                </div>
                            }
                            classNames={{
                                input: "bg-transparent border-none focus:ring-0 space-y-10",
                                innerWrapper: "bg-transparent",
                                inputWrapper: "bg-transparent shadow-none",
                            }}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="p-4 rounded-lg flex flex-col items-center">
                            <h3 className="text-lg font-semibold mb-2 px-10">Course Thumbnail</h3>
                            {imageUrl ? (
                                <div className="flex flex-col items-center gap-4">
                                    <Image
                                        src={imageUrl}
                                        alt="Course Image"
                                        width={200}
                                        height={200}
                                        radius="sm"
                                    //className="rounded-lg"
                                    />
                                    <Button variant="flat" onPress={() => setImageUrl('')}>
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
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Course Description</h3>
                    <Tiptap canEdit={true} description={description} onChange={(newDescription) => setDescription(newDescription)} />
                </div>

                <Accordion key={items.length} variant="splitted" selectionMode="multiple">
                    {items.map((item: Section, index: number) => (
                        <AccordionItem key={index} aria-label={`Section ${index + 1}`}
                            title={item?.name !== '' ? item?.name : `Section ${index + 1}`}
                        >
                            <div className="space-y-4 p-4">
                                <Input
                                    isRequired
                                    type="string"
                                    name="name"
                                    label="Section Name"
                                    value={item?.name}
                                    variant="bordered"
                                    isDisabled={isLoading}
                                    onChange={(event) => handleInputChange(index, event)}
                                />
                                <div className="p-4 rounded-lg">
                                    <h4 className="text-md font-semibold mb-2">Section Description</h4>
                                    <Tiptap
                                        canEdit={true}
                                        description={item.description}
                                        onChange={(newDescription) => handleDescriptionChange(index, newDescription)}
                                    />
                                </div>
                                <div className="flex flex-col items-center gap-4 p-4 rounded-lg">
                                    <h4 className="text-md font-semibold">Section Video</h4>
                                    {item.videoUrl ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <video
                                                src={item.videoUrl}
                                                width={200}
                                                height={200}
                                                controls
                                                className="rounded-lg"
                                            />
                                            <Button variant="flat" onPress={() => handleVideoUpload(index, '', false)}>
                                                Change Video
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="w-[200px] h-[200px] flex items-center justify-center">
                                            {item.isVideoUploading ? (
                                                <Spinner color="white" />
                                            ) : (
                                                <UploadButton
                                                    endpoint="videoUploader"
                                                    onClientUploadComplete={(res) => {
                                                        handleVideoUpload(index, res[0].url, false);
                                                    }}
                                                    onUploadBegin={() => {
                                                        handleVideoUpload(index, '', true);
                                                    }}
                                                    onUploadError={(error: Error) => {
                                                        handleVideoUpload(index, '', false);
                                                        alert(`ERROR! ${error.message}`);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                                <Button
                                    color="danger"
                                    variant="light"
                                    isDisabled={isLoading}
                                    onClick={handleDeleteClick}
                                >
                                    Remove
                                </Button>
                                <Modal isOpen={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                                    <ModalContent>
                                        <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
                                        <ModalBody>
                                            <p>Are you sure you want to delete this section? This action cannot be undone.</p>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="default" variant="light" onPress={() => setDeleteDialogOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button color="danger" onClick={() => handleRemoveItem(index)}>
                                                {isLoading ? <Spinner color="white" /> : 'Delete'}
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </div>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="flex justify-center">
                    <Tooltip content="Add Section">
                        <Button isDisabled={isLoading} onClick={() => handleAddItem()} variant="faded" isIconOnly>
                            <PlusIcon className="w-6 h-6" />
                        </Button>
                    </Tooltip>
                </div>

                <div className="flex justify-end gap-4">
                    <Tooltip
                        content={isLoading ? "Loading..." : isFormValid ? "Save" : formValidationMessage}
                        color={isFormValid ? "default" : "danger"}
                    >
                        <span>
                            <Button
                                color="primary"
                                type="submit"
                                isDisabled={!isFormValid || isLoading}
                            >
                                {isLoading ? <Spinner color="white" /> : 'Save'}
                            </Button>
                        </span>
                    </Tooltip>
                </div>
            </form>
        </div>
    );
}