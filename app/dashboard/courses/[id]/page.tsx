import { getCourse } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Image } from "@nextui-org/image";
import Tiptap from "@/app/components/tiptap";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const course = await getCourse(id);
    if (!course) {
        notFound();
    }

    return (
        <main className="flex min-h-screen">
            <div className="flex-1 flex flex-col items-center p-6">
                <div className="text-center max-w-4xl mx-auto ml-16">
                    <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
                    <Tiptap canEdit={false} description={course.description || ''} />
                </div>
            </div>
        </main>
    );
}