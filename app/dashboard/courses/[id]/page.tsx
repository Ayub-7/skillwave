import { getCourse } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const course = await getCourse(parseInt(id, 10))
    if (!course) {
        notFound();
    }

    return (
        <main className="flex h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold">{course.name}</h1>
                <p className="mt-4">{course.description}</p>
            </div>
        </main>
    );
}
