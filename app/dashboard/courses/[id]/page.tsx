import { getCourse } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Tiptap from "@/app/components/tiptap";
import Link from 'next/link';
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const course = await getCourse(id);
    if (!course) {
        notFound();
    }

    return (
        <main className="flex min-h-screen justify-center items-center">
            <div className="flex-1 flex flex-col items-center p-6 max-w-4xl">
                <div className="w-full relative mb-4">
                    <h1 className="text-3xl font-bold text-center">{course.name}</h1>
                    <div className="flex items-center justify-center mt-6">
                        <div className="mr-2">
                            <Avatar src={course.author.image as any} />
                        </div>
                        <Link href={`/dashboard/profile/${course.author.id}`} className="text-blue-500 hover:underline focus:outline-none">
                            By {course.author.name}
                        </Link>
                    </div>
                </div>
                <div className="text-center">
                    <Tiptap canEdit={false} description={course.description || ''} />
                </div>
            </div>
        </main>
    );
}