'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';
import { BuyCourse } from '@/app/lib/actions';
import { Button } from "@nextui-org/react";


export default function SectionButtons({ price, sections, courseId, hasAccess }: any) {
    const router = useRouter();
    const pathname = usePathname();

    const handleCardPress = (sectionId: any) => {
        if (hasAccess) {
            router.push(`/dashboard/courses/${courseId}/section/${sectionId}`);
        }
    };

    const backToPreview = () => {
        router.push(`/dashboard/courses/${courseId}`);
    };

    if (pathname.includes('/edit')) {
        return null;
    }

    const currentSectionId = pathname.split('/').pop();

    return (
        <aside className="w-full">
            <nav className="flex flex-wrap items-center justify-start mb-2">
                <Button
                    onClick={backToPreview}
                    color={!pathname.includes('/section/') ? 'primary' : 'default'}
                    className="flex justify-center items-center mb-4 mx-2 mt-2"
                >
                    Preview
                </Button>

                {sections.map((section: any) => (
                    <Button
                        key={section.id}
                        onClick={() => handleCardPress(section.id)}
                        color={section.id.toString() === currentSectionId ? 'primary' : 'default'}
                        className="flex justify-center items-center mb-4 mx-2 mt-2"
                        isDisabled={!hasAccess}
                        startContent={
                            !hasAccess ? (
                                <Lock className="h-4 w-4 mr-2" />
                            ) : null
                        }
                    >
                        {section.name}
                    </Button>
                ))}
            </nav>
        </aside>
    );
}