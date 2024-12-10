import { getSection, getUser } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardBody } from "@nextui-org/card";
import Tiptap from "@/app/components/tiptap";
import { auth } from "@/auth"
import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default async function Page({ params }: { params: { sectionId: string } }) {
    const session = await auth();
    const id = params.sectionId;
    let hasAccess = false;
    const section = await getSection(id)
    if (!section) {
        notFound();
    }
    if (session) {
        const user = await getUser(session.user?.id)
        if (user?.purchasedCourses.includes(section.courseId) || user?.id === section.course.authorId) {
            hasAccess = true;
        }
    }

    if (!hasAccess) {
        return (
            <main className="flex h-full flex-col items-center justify-center gap-2">
                <FaceFrownIcon className="w-10 text-gray-400" />
                <h2 className="text-xl font-semibold">403 Forbidden</h2>
                <p>Could not authorize the request.</p>
                <Link
                    href={`/dashboard/courses/${section.courseId}`}
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                >
                    Go Back
                </Link>
            </main>
        )
    }

    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="flex-1 flex flex-col items-center p-6 max-w-4xl w-full">
                <Card className="w-full mb-8">
                    <CardBody>
                        {section.videoUrl ? (
                            <div className="aspect-video w-full mb-4">
                                <video
                                    className="w-full h-full rounded-lg"
                                    controls
                                    preload="metadata"
                                >
                                    <source src={section.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        ) : (
                            <div className="aspect-video w-full mb-4 bg-gray-200 flex items-center justify-center rounded-lg">
                                <p className="text-gray-500">No video available</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
                <div className="text-center w-full">
                    <Tiptap canEdit={false} description={section.description || ''} />
                </div>
            </div>
        </main>
    );
}