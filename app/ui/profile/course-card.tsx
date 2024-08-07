'use client'
import { Card, CardHeader, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

interface CourseCardProps {
    id: number
    title: string;
    imageUrl: string;
    price: number;
}

export default function CourseCard({ id, title, imageUrl, price }: CourseCardProps) {
    const router = useRouter();

    const handleCardPress = () => {
        router.push(`/dashboard/courses/${id}`);
    };

    return (
        <Card onPress={handleCardPress} className="py-4" isPressable>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large">{title}</h4>
                {/* <p className="text-tiny uppercase font-bold">{description}</p> */}
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