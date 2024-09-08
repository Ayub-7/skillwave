'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function SectionsBar({ sections, courseId }: any) {
    const router = useRouter();
    const pathname = usePathname();


    const handleCardPress = (sectionId: any) => {
        router.push(`/dashboard/courses/${courseId}/section/${sectionId}`);
    };

    const backToPreview = () => {
        console.log(courseId);
        router.push(`/dashboard/courses/${courseId}`);
    };
    if (pathname.includes('/edit')) {
        return null;
    }

    return (
        <aside className="w-full sm:w-1/4 py-8 px-6">
            <h2 className="text-2xl font-bold mb-6">Course Chapters</h2>
            <nav>
                <ul className="list-disc pl-5 space-y-4">
                    <li
                        onClick={backToPreview}
                        className="text-lg hover:text-gray-400 transition-colors cursor-pointer"
                    >
                        Preview
                    </li>
                    {sections.map((section: any) => (
                        <li
                            onClick={() => handleCardPress(section.id)}
                            key={section.id}
                            className="text-lg hover:text-gray-400 transition-colors cursor-pointer"
                        >
                            {section.name}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
