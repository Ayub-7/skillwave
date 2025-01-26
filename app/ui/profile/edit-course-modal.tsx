'use client'
import React, { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { CircularProgress } from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import { Input } from "@heroui/input";
import { Image } from "@heroui/image";
import { UploadButton } from "@/app/lib/uploadthing";
import { deleteSection, updateCourse } from "@/app/lib/actions";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import Tiptap from "@/app/components/tiptap";
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Section {
    id?: string;
    name: string;
    description: string;
    videoUrl?: string;
    isVideoUploading?: boolean;
    uploadProgress?: number;
    pdfUrl: string;
    isPdfUploading?: boolean;
    pdfUploadProgress?: number;
    order?: number;
}

export default function EditCourseModal({ course }: any) {
    const [name, setName] = React.useState(course.name);
    const [description, setDescription] = React.useState(course.description);
    const [price, setPrice] = React.useState(course.price);
    const [items, setItems] = React.useState<Section[]>(
        course.Sections.map((section: Section) => ({ ...section, isVideoUploading: false, isPdfUploading: false }))
    );
    const [isLoading, setIsLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState(course.imageUrl || '');
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [sectionToDeleteIndex, setSectionToDeleteIndex] = React.useState<number | null>(null);

    const handleDescriptionChange = (index: number, newDescription: string) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index].description = newDescription;
            return newItems;
        });
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === 'name') {
            setItems(prevItems => {
                const newItems = [...prevItems];
                newItems[index].name = value;
                return newItems;
            });
        }
    };

    const handleVideoUpload = (index: number, url: string, isUploading: boolean, uploadProgress: number) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index].videoUrl = url;
            newItems[index].isVideoUploading = isUploading;
            newItems[index].uploadProgress = uploadProgress;
            return newItems;
        });
    };

    const handlePdfUpload = (index: number, url: string, isUploading: boolean, uploadProgress: number) => {
        setItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index].pdfUrl = url;
            newItems[index].isPdfUploading = isUploading;
            newItems[index].pdfUploadProgress = uploadProgress;
            return newItems;
        });
    };

    const isInvalidName = React.useMemo(() => name === "", [name]);
    const isInvalidPrice = React.useMemo(() => price === "" || parseFloat(price) < 0, [price]);

    const isFormValid = React.useMemo(() => {
        return name !== '' &&
            price !== '' &&
            parseFloat(price) >= 0 &&
            items.every(item => item?.name !== '' && !item.isVideoUploading && !item.isPdfUploading);
    }, [name, price, items]);

    const formValidationMessage = React.useMemo(() => {
        if (name === '') return "Course name is required";
        if (price === '') return "Price is required";
        if (parseFloat(price) < 0) return "Price can't be less than zero";
        if (items.some(item => item?.name === '')) return "All section names are required";
        if (items.some(item => item.isVideoUploading || item.isPdfUploading)) return "Upload in progress";
        return "";
    }, [name, price, items]);

    const handleAddItem = () => {
        setItems(prevItems => [...prevItems, { name: '', description: '', videoUrl: '', pdfUrl: '', order: prevItems.length }]);
    };

    const handleRemoveItem = async (index: number) => {
        const itemToRemove = items[index];
        setItems(prevItems => {
            const filteredItems = prevItems.filter((_, i) => i !== index);
            // Reorder the remaining items
            return filteredItems.map((item, idx) => ({
                ...item,
                order: idx
            }));
        });

        if (itemToRemove.id) {
            await deleteSection(itemToRemove.id, course.authorId);
        }
        setDeleteDialogOpen(false);
        setSectionToDeleteIndex(null);
    };

    const handleDeleteClick = (index: number) => {
        setSectionToDeleteIndex(index);
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
                style: { zIndex: 9999 },
            });
        } catch (error) {
            toast.error('Error, try again!', {
                duration: 3000,
                position: 'top-right',
                style: { zIndex: 9999 },
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
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
                                content={{
                                    button({ ready }) {
                                        if (ready) return <div>Upload Image</div>;
                                        return "Getting ready...";
                                    }
                                }}
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
                {items.sort((a: any, b: any) => a.order - b.order).map((item: Section, index: number) => (
                    <AccordionItem key={index} aria-label={`Section ${index + 1}`}
                        title={item?.name !== '' ? item?.name : `Section ${index + 1}`}
                        startContent={
                            item.isVideoUploading && (
                                <div className="flex flex-col items-center">
                                    <CircularProgress
                                        aria-label="Loading..."
                                        size="lg"
                                        value={item.uploadProgress}
                                        color="success"
                                        showValueLabel={true}
                                    />
                                </div>
                            )
                        }
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
                                {item.videoUrl ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <video
                                            src={item.videoUrl}
                                            width={200}
                                            height={200}
                                            controls
                                            className="rounded-lg"
                                        />
                                        <Button variant="flat" onPress={() => handleVideoUpload(index, '', false, 0)}>
                                            Change Video
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        {item.isVideoUploading ? (
                                            <div className="flex flex-col items-center">
                                                <CircularProgress
                                                    aria-label="Loading..."
                                                    size="lg"
                                                    value={item.uploadProgress}
                                                    color="success"
                                                    showValueLabel={true}
                                                />
                                            </div>
                                        ) : (
                                            <UploadButton
                                                endpoint="videoUploader"
                                                content={{
                                                    button({ ready }) {
                                                        if (ready) return <div>Upload Video</div>;
                                                        return "Getting ready...";
                                                    }
                                                }}
                                                onClientUploadComplete={(res) => {
                                                    handleVideoUpload(index, res[0].url, false, 0);
                                                }}
                                                onUploadBegin={() => {
                                                    handleVideoUpload(index, '', true, 0);
                                                }}
                                                onUploadProgress={(progress: number) => {
                                                    handleVideoUpload(index, '', true, progress);
                                                }}
                                                onUploadError={(error: Error) => {
                                                    handleVideoUpload(index, '', false, 0);
                                                    alert(`ERROR! ${error.message}`);
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col items-center gap-4 p-4 rounded-lg">
                                {item.pdfUrl ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <Link
                                            href={item.pdfUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                                        >
                                            View PDF
                                        </Link>
                                        <Button variant="flat" onPress={() => handlePdfUpload(index, '', false, 0)}>
                                            Change PDF
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        {item.isPdfUploading ? (
                                            <div className="flex flex-col items-center">
                                                <CircularProgress
                                                    aria-label="Loading..."
                                                    size="lg"
                                                    value={item.pdfUploadProgress}
                                                    color="success"
                                                    showValueLabel={true}
                                                />
                                            </div>
                                        ) : (
                                            <UploadButton
                                                endpoint="pdfUploader"
                                                content={{
                                                    button({ ready }) {
                                                        if (ready) return <div>Upload PDF</div>;
                                                        return "Getting ready...";
                                                    }
                                                }}
                                                onClientUploadComplete={(res) => {
                                                    handlePdfUpload(index, res[0].url, false, 0);
                                                }}
                                                onUploadBegin={() => {
                                                    handlePdfUpload(index, '', true, 0);
                                                }}
                                                onUploadProgress={(progress: number) => {
                                                    handlePdfUpload(index, '', true, progress);
                                                }}
                                                onUploadError={(error: Error) => {
                                                    handlePdfUpload(index, '', false, 0);
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
                                onPress={() => handleDeleteClick(index)}
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
                                        <Button color="danger" onPress={() => sectionToDeleteIndex !== null && handleRemoveItem(sectionToDeleteIndex)}>
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
                    <Button isDisabled={isLoading} onPress={() => handleAddItem()} variant="faded" isIconOnly>
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
    );
}