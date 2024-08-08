import { getCourse } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import SectionsBar from '@/app/ui/course/sections-bar';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const course = await getCourse(parseInt(id, 10));
    if (!course) {
        notFound();
    }

    return (
        <main className="flex min-h-screen">
            <div className="flex-1 flex flex-col items-center p-6">
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
                    <p className="text-lg mb-8">{course.description}</p>
                    {/* Additional content can go here */}
                </div>
            </div>
        </main>
    );
}