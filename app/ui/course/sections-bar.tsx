'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Lock } from 'lucide-react';
import { BuyCourse } from '@/app/lib/actions'; // adjust the import path
import { BuyButton } from "@/app/ui/button";

export default function SectionsBar({ price, sections, courseId, hasAccess }: any) {
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
        <aside className="w-26 py-8 mt-4 px-4 shadow-lg border border-transparent rounded-lg bg-white dark:bg-neutral-900 dark:shadow-gray-700/30 transition-shadow duration-300 ease-in-out">
            <h2 className="text-lg font-bold mb-4">Course Chapters</h2>
            <nav>
                <ul className="space-y-4">
                    <li
                        onClick={backToPreview}
                        className={`flex items-center text-lg transition-colors cursor-pointer ${!pathname.includes('/section/')
                            ? 'font-bold text-blue-500'
                            : 'hover:text-gray-400'
                            }`}
                    >
                        <span className="inline-flex items-center">
                            <span className="h-1 w-1 rounded-full bg-current mr-4 ml-2" />
                        </span>
                        <span>Preview</span>
                    </li>
                    {sections.map((section: any) => (
                        <li
                            onClick={() => handleCardPress(section.id)}
                            key={section.id}
                            className={`flex items-center text-lg transition-colors ${hasAccess
                                ? 'cursor-pointer'
                                : 'cursor-not-allowed opacity-70'
                                } ${section.id.toString() === currentSectionId
                                    ? 'font-bold text-blue-500'
                                    : hasAccess ? 'hover:text-gray-400' : ''
                                }`}
                        >
                            <span className="inline-flex items-center">
                                {!hasAccess ? (
                                    <Lock className="h-4 w-4 mr-4" />
                                ) : (
                                    <span className="h-1 w-1 rounded-full bg-current mr-4 ml-2" />
                                )}
                            </span>
                            <span>{section.name}</span>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}