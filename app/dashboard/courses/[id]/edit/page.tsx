import { getCourse } from "@/app/lib/data";
import EditCourseModal from "@/app/ui/profile/edit-course-modal";
import { notFound, redirect } from 'next/navigation';
import { auth } from "@/auth"

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth();
    if (!session) {
        redirect('/login')
    }
    const id = params.id;
    const course = await getCourse(id)
    if (course?.authorId !== session.user?.id) {
        notFound()
    }
    return (
        < EditCourseModal course={course} />
    );
}

