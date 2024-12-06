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
        <aside className="w-64">
            <nav className="space-y-4">
                <Button
                    onClick={backToPreview}
                    //variant={!pathname.includes('/section/') ? 'solid' : 'light'}
                    color={!pathname.includes('/section/') ? 'primary' : 'default'}
                    className="justify-start"
                >
                    Preview
                </Button>

                {sections.map((section: any) => (
                    <Button
                        key={section.id}
                        onClick={() => handleCardPress(section.id)}
                        // variant={section.id.toString() === currentSectionId ? 'solid' : 'light'}
                        color={section.id.toString() === currentSectionId ? 'primary' : 'default'}
                        className="justify-start"
                        isDisabled={!hasAccess}
                        startContent={
                            !hasAccess ? (
                                <Lock className="h-4 w-4 mr-2" />
                            ) : section.id.toString() === currentSectionId ? null : (
                                <span className="h-2 w-2 rounded-full bg-current mr-2" />
                            )
                        }
                    >
                        {section.name}
                    </Button>
                ))}

            </nav>
        </aside>
    );
}