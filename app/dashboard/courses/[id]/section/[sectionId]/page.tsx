import { getSection } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Card, CardBody } from "@nextui-org/card";
import Tiptap from "@/app/components/tiptap";


export default async function Page({ params }: { params: { sectionId: string } }) {
    const id = params.sectionId;
    const section = await getSection(parseInt(id, 10))
    if (!section) {
        notFound();
    }

    return (
        <main className="flex min-h-screen">
            <div className="flex-1 flex flex-col items-center p-6">
                <div className="text-center max-w-4xl mx-auto">
                    <Card className="w-full max-w-3xl mb-8">
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
                            <h1 className="text-3xl font-bold mb-4">{section.name}</h1>
                        </CardBody>
                    </Card>
                    <Tiptap canEdit={false} description={section.description || ''} />
                </div>
            </div>
        </main>
    );
}