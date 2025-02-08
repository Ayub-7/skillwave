'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Lock, PlayCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { Button } from "@heroui/react";

export default function SectionButtons({ sections, courseId, hasAccess }: any) {
    const router = useRouter();
    const pathname = usePathname();
    const currentSectionId = pathname.split('/').pop();

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

    return (
        <aside className="w-full px-4 py-6">
            <nav className="flex flex-col space-y-3">
                <Button
                    onPress={backToPreview}
                    className={cn(
                        "w-full h-12 text-left justify-start px-4",
                        "bg-gray-50 dark:bg-neutral-900 hover:bg-gray-50 dark:hover:bg-neutral-800",
                        !pathname.includes('/section/') && "bg-blue-50 dark:bg-blue-900/20"
                    )}
                    startContent={
                        <PlayCircle className={cn(
                            "h-5 w-5",
                            !pathname.includes('/section/') ? "text-blue-500" : "text-gray-400"
                        )} />
                    }
                    variant="flat"
                >
                    <span className={cn(
                        "text-gray-700 dark:text-gray-300",
                        !pathname.includes('/section/') && "font-semibold text-blue-600 dark:text-blue-400"
                    )}>
                        Course Preview
                    </span>
                </Button>

                {sections.sort((a: any, b: any) => a.order - b.order).map((section: any, index: number) => (
                    <Button
                        key={section.id}
                        onPress={() => handleCardPress(section.id)}
                        className={cn(
                            "w-full h-12 text-left justify-start px-4",
                            "bg-gray-50 dark:bg-neutral-900",
                            hasAccess && "hover:bg-gray-50 dark:hover:bg-neutral-800",
                            section.id.toString() === currentSectionId && "bg-blue-50 dark:bg-blue-900/20",
                            !hasAccess && "opacity-80"
                        )}
                        isDisabled={!hasAccess}
                        variant="flat"
                        startContent={
                            !hasAccess ? (
                                <Lock className="h-5 w-5 text-gray-400" />
                            ) : (
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-neutral-800">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{index + 1}</span>
                                </div>
                            )
                        }
                    >
                        <span className={cn(
                            "text-gray-700 dark:text-gray-300",
                            section.id.toString() === currentSectionId && "font-semibold text-blue-600 dark:text-blue-400"
                        )}>
                            {section.name}
                        </span>
                    </Button>
                ))}
            </nav>

            {!hasAccess && (
                <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium text-center">
                        Purchase this course to access all chapters
                    </p>
                </div>
            )}
        </aside>
    );
}