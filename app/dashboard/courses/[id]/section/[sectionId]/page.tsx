import { getSection } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { sectionId: string } }) {
    const id = params.sectionId;
    const section = await getSection(parseInt(id, 10))
    if (!section) {
        notFound();
    }

    return (
        <div className="flex-1 flex flex-col items-center p-6">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">{section.name}</h1>
                <p className="text-lg mb-8">{section.description}</p>
            </div>
        </div>
    );
}
