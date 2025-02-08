'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Lock, PlayCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import { useState } from 'react';

export default function SectionsBar({ sections, courseId, hasAccess, defaultCollapsed }: any) {
    const router = useRouter();
    const pathname = usePathname();
    const currentSectionId = pathname.split('/').pop();
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

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
        <aside className={cn(
            "py-6 shadow-lg border border-transparent rounded-xl bg-white dark:bg-neutral-900 dark:shadow-gray-700/30",
            "transform transition-all duration-200 ease-out",
            "mt-4",
            isCollapsed ? "w-16" : "w-72"
        )}>
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 p-1.5 rounded-full bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors z-50"
            >
                {isCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                    <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
            </button>

            {/* {!isCollapsed && (
                <div
                    className="fixed inset-0 z-30 md:hidden"
                    onClick={() => setIsCollapsed(true)}
                />
            )} */}

            <div className={cn("px-6", isCollapsed && "hidden")}>
                <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">Course Content</h2>
                <nav>
                    <ul className="space-y-3">
                        <li
                            onClick={backToPreview}
                            className={cn(
                                "flex items-center p-3 rounded-lg transition-all duration-200",
                                "hover:bg-gray-50 dark:hover:bg-neutral-800",
                                !pathname.includes('/section/') && "bg-blue-50 dark:bg-blue-900/20"
                            )}
                        >
                            <PlayCircle className={cn(
                                "h-5 w-5 mr-3",
                                !pathname.includes('/section/') ? "text-blue-500" : "text-gray-400"
                            )} />
                            <span className={cn(
                                "text-gray-700 dark:text-gray-300",
                                !pathname.includes('/section/') && "font-semibold text-blue-600 dark:text-blue-400"
                            )}>
                                Course Preview
                            </span>
                        </li>

                        {sections.sort((a: any, b: any) => a.order - b.order).map((section: any, index: number) => (
                            <li
                                onClick={() => handleCardPress(section.id)}
                                key={section.id}
                                className={cn(
                                    "flex items-center p-3 rounded-lg transition-all duration-200",
                                    hasAccess ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800" : "cursor-not-allowed",
                                    section.id.toString() === currentSectionId && "bg-blue-50 dark:bg-blue-900/20",
                                    !hasAccess && "opacity-80"
                                )}
                            >
                                <div className="flex items-center">
                                    {!hasAccess ? (
                                        <Lock className="h-5 w-5 mr-3 text-gray-400" />
                                    ) : (
                                        <div className="flex items-center justify-center w-6 h-6 mr-3 rounded-full bg-gray-100 dark:bg-neutral-800">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{index + 1}</span>
                                        </div>
                                    )}
                                </div>
                                <span className={cn(
                                    "text-gray-700 dark:text-gray-300",
                                    section.id.toString() === currentSectionId && "font-semibold text-blue-600 dark:text-blue-400"
                                )}>
                                    {section.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>
                {!hasAccess && (
                    <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                            Purchase this course to access all chapters
                        </p>
                    </div>
                )}
            </div>

            {/* Collapsed view */}
            <div className={cn("px-3", !isCollapsed && "hidden")}>
                <ul className="space-y-3">
                    <li
                        onClick={backToPreview}
                        className={cn(
                            "flex items-center justify-center p-2 rounded-lg transition-all duration-200",
                            "hover:bg-gray-50 dark:hover:bg-neutral-800",
                            !pathname.includes('/section/') && "bg-blue-50 dark:bg-blue-900/20"
                        )}
                    >
                        <PlayCircle className={cn(
                            "h-5 w-5",
                            !pathname.includes('/section/') ? "text-blue-500" : "text-gray-400"
                        )} />
                    </li>

                    {sections.sort((a: any, b: any) => a.order - b.order).map((section: any, index: number) => (
                        <li
                            onClick={() => handleCardPress(section.id)}
                            key={section.id}
                            className={cn(
                                "flex items-center justify-center p-2 rounded-lg transition-all duration-200",
                                hasAccess ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800" : "cursor-not-allowed",
                                section.id.toString() === currentSectionId && "bg-blue-50 dark:bg-blue-900/20",
                                !hasAccess && "opacity-80"
                            )}
                        >
                            {!hasAccess ? (
                                <Lock className="h-5 w-5 text-gray-400" />
                            ) : (
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-neutral-800">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{index + 1}</span>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}