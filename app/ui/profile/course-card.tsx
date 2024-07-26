'use client'
import { Card, CardHeader, CardBody, CardFooter, Button, Image } from "@nextui-org/react";

interface CourseCardProps {
    title: string;
    description: string;
    imageUrl: string;
    price: number;
}

export default function CourseCard({ title, description, imageUrl, price }: CourseCardProps) {
    return (
        <Card className="py-4" isPressable>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{title}</h4>
                <p className="text-tiny uppercase font-bold">{description}</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={imageUrl}
                    width={270}
                />
            </CardBody>
            <CardFooter>
                <p>${price}</p>
            </CardFooter>
        </Card>
    );
}