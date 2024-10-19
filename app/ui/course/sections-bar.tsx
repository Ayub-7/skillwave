'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function SectionsBar({ sections, courseId }: any) {
    const router = useRouter();
    const pathname = usePathname();

    const handleCardPress = (sectionId: any) => {
        router.push(`/dashboard/courses/${courseId}/section/${sectionId}`);
    };

    const backToPreview = () => {
        router.push(`/dashboard/courses/${courseId}`);
    };

    if (pathname.includes('/edit')) {
        return null;
    }

    const currentSectionId = pathname.split('/').pop();

    return (
        <aside className="w-64 py-8 px-4">
            <h2 className="text-2xl font-bold mb-4">Course Chapters</h2>
            <nav>
                <ul className="list-disc pl-5 space-y-4">
                    <li
                        onClick={backToPreview}
                        className={`text-lg transition-colors cursor-pointer ${!pathname.includes('/section/') ? 'font-bold text-blue-500' : 'hover:text-gray-400'
                            }`}
                    >
                        Preview
                    </li>
                    {sections.map((section: any) => (
                        <li
                            onClick={() => handleCardPress(section.id)}
                            key={section.id}
                            className={`text-lg transition-colors cursor-pointer ${section.id.toString() === currentSectionId ? 'font-bold text-blue-500' : 'hover:text-gray-400'
                                }`}
                        >
                            {section.name}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}