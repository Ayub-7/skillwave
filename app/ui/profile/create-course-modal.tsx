'use client'
import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Spinner } from "@nextui-org/spinner";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { createCourse } from "@/app/lib/actions";
import { Image } from "@nextui-org/image";
import { UploadButton } from "@/app/lib/uploadthing";

export default function CreateCourseModal({ user }: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [items, setItems] = React.useState([{ name: '', description: '', videoUrl: '' }]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState(user.imageUrl || '');

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
            items.every(item => item.name !== '');
    }, [name, price, items]);

    const formValidationMessage = React.useMemo(() => {
        if (name === '') return "Course name is required";
        if (price === '') return "Price is required";
        if (items.some(item => item.name === '')) return "All section names are required";
        return "";
    }, [name, price, items]);

    const handleAddItem = () => {
        setItems([...items, { name: '', description: '', videoUrl: '' }]);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleSubmit = async (onClose: () => void) => {
        if (!isFormValid) return;
        setIsLoading(true)
        try {
            await createCourse({
                name: name,
                description: description,
                authorId: user.id,
                price: parseFloat(price),
                imageUrl: imageUrl,
            }, items);
            setIsLoading(false)
            resetForm();
            onClose();
        } catch (error) {
            console.error('Error updating user:', error);
            setIsLoading(false)
            onClose();
        };
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setItems([{ name: '', description: '', videoUrl: '' }]);
        setImageUrl(user.imageUrl || '');
    };

    return (
        <>
            <Tooltip content="Create Course">
                <Button onPress={onOpen} variant="shadow" isIconOnly>
                    <PlusIcon className="w-6 h-6" />
                </Button>
            </Tooltip>
            <Modal isDismissable={false} size="3xl" placement="top-center" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create Course</ModalHeader>
                            <ModalBody>
                                <div className="space-y-2">
                                    <Input
                                        value={name}
                                        isRequired
                                        color={isInvalidName ? "danger" : "default"}
                                        errorMessage="Please enter name"
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
                                        errorMessage="Please enter name"
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
                                    {items.map((item: any, index: number) => (
                                        <AccordionItem key={index} aria-label={`Section ${index + 1}`}
                                            title={item.name !== '' ? item.name : `Section ${index + 1}`}
                                        >
                                            <div key={index} className="space-y-2">
                                                <Input
                                                    isRequired
                                                    type="string"
                                                    name="name"
                                                    label="Section Name"
                                                    value={item.name}
                                                    variant="bordered"
                                                    onChange={(event) => handleInputChange(index, event)}
                                                    isDisabled={isLoading}
                                                />
                                                <Textarea
                                                    type="string"
                                                    name="description"
                                                    label="Description"
                                                    value={item.description}
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
                                    content={isLoading ? "Loading..." : isFormValid ? "Create course" : formValidationMessage}
                                    color={isFormValid ? "default" : "danger"}
                                >
                                    <div>  {/* Wrapper div to ensure tooltip works */}
                                        <Button
                                            color="primary"
                                            onPress={() => handleSubmit(onClose)}
                                            isDisabled={!isFormValid || isLoading}
                                        >
                                            {isLoading ? <Spinner color="white" /> : 'Create'}
                                        </Button>
                                    </div>
                                </Tooltip>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}