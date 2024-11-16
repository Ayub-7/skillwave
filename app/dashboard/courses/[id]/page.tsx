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
                <div className="w-full max-w-4xl mx-auto ml-16 relative mb-4">
                    <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded">
                        Buy for ${course.price}
                    </button>
                    <h1 className="text-3xl font-bold text-center">{course.name}</h1>
                </div>
                <div className="text-center max-w-4xl mx-auto ml-16">
                    <Tiptap canEdit={false} description={course.description || ''} />
                </div>
            </div>
        </main>
    );
}