'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Lock, PlayCircle } from 'lucide-react';
import { cn } from '@/app/lib/utils';

export default function SectionsBar({ sections, courseId, hasAccess }: any) {
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
        <aside className="w-72 py-6 mt-4 px-6 shadow-lg border border-transparent rounded-xl bg-white dark:bg-neutral-900 dark:shadow-gray-700/30 transition-all duration-300 ease-in-out hover:shadow-xl">
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
        </aside>
    );
}