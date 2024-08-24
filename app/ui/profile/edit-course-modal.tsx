'use client'
import React, { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/spinner";
import { Input, Textarea } from "@nextui-org/input";
import { Image } from "@nextui-org/image";
import { UploadButton } from "@/app/lib/uploadthing";
import { deleteSection, updateCourse } from "@/app/lib/actions";

interface Section {
    id?: number;
    name: string;
    description: string;
    videoUrl?: string;
}

export default function EditCourseModal({ course, isOpen, onClose }: any) {
    const [name, setName] = React.useState(course.name);
    const [description, setDescription] = React.useState(course.description);
    const [price, setPrice] = React.useState(course.price);
    const [items, setItems] = React.useState<Section[]>(course.Sections);
    const [isLoading, setIsLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState(course.imageUrl || '');

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const newItems = [...items];
        if (name === 'name' || name === 'description') {
            newItems[index][name] = value;
            setItems(newItems);
        }
    };

    const handleVideoUpload = (index: number, url: string) => {
        const newItems = [...items];
        newItems[index].videoUrl = url;
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
        if (name === '') return "Course name is required";
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
    };

    const handleSubmit = async () => {
        if (!isFormValid) return;
        setIsLoading(true)
        try {
            await updateCourse(course.id, {
                name,
                description,
                price: parseFloat(price),
                authorId: course.authorId,
                imageUrl,
            }, items);

            console.log('Course updated successfully');
            setIsLoading(false)
            onClose();
        } catch (error) {
            console.error('Error updating course:', error);
            setIsLoading(false)
            onClose();
        }
    };


    return (
        <Modal isDismissable={false} size="3xl" placement="top-center" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Edit Course</ModalHeader>
                <ModalBody>
                    <div className="space-y-2">
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
                        <Textarea
                            value={description}
                            variant="bordered"
                            onChange={(e) => setDescription(e.target.value)}
                            type="string"
                            label="Description"
                            isDisabled={isLoading}
                            classNames={{
                                input: "bg-transparent border-none focus:ring-0",
                                innerWrapper: "bg-transparent",
                                inputWrapper: "bg-transparent shadow-none",
                            }}
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
                        <div className="flex flex-col items-center gap-4">
                            <h3 className="text-lg font-semibold">Course Image</h3>
                            {imageUrl ? (
                                <div className="flex flex-col items-center gap-4">
                                    <Image
                                        src={imageUrl}
                                        alt="Course Image"
                                        width={200}
                                        height={200}
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
                                        alert(`ERROR! ${error.message}`);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                    <Accordion key={items.length} variant="splitted" selectionMode="multiple">
                        {items.map((item: Section, index: number) => (
                            <AccordionItem key={index} aria-label={`Section ${index + 1}`}
                                title={item?.name !== '' ? item?.name : `Section ${index + 1}`}
                            >
                                <div key={index} className="space-y-2">
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
                                    <Textarea
                                        type="string"
                                        name="description"
                                        label="Description"
                                        value={item?.description}
                                        variant="bordered"
                                        onChange={(event) => handleInputChange(index, event)}
                                        isDisabled={isLoading}
                                        classNames={{
                                            input: "bg-transparent border-none focus:ring-0",
                                            innerWrapper: "bg-transparent",
                                            inputWrapper: "bg-transparent shadow-none",
                                        }}
                                    />
                                    <div className="flex flex-col items-center gap-4">
                                        <h3 className="text-lg font-semibold">Section Video</h3>
                                        {item.videoUrl ? (
                                            <div className="flex flex-col items-center gap-4">
                                                <video
                                                    src={item.videoUrl}
                                                    width={200}
                                                    height={200}
                                                    controls
                                                />
                                                <Button onPress={() => handleVideoUpload(index, '')}>
                                                    Change Video
                                                </Button>
                                            </div>
                                        ) : (
                                            <UploadButton
                                                endpoint="videoUploader"
                                                onClientUploadComplete={(res) => {
                                                    handleVideoUpload(index, res[0].url)
                                                }}
                                                onUploadError={(error: Error) => {
                                                    alert(`ERROR! ${error.message}`);
                                                }}
                                            />
                                        )}
                                    </div>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        isDisabled={isLoading}
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        Remove
                                    </Button>
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
                </ModalBody>
                <ModalFooter>
                    <Button isDisabled={isLoading} color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                    <Tooltip
                        content={isLoading ? "Loading..." : isFormValid ? "Update course" : formValidationMessage}
                        color={isFormValid ? "default" : "danger"}
                    >
                        <div>
                            <Button
                                color="primary"
                                onPress={handleSubmit}
                                isDisabled={!isFormValid || isLoading}
                            >
                                {isLoading ? <Spinner color="white" /> : 'Update'}
                            </Button>
                        </div>
                    </Tooltip>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}