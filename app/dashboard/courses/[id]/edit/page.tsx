import { getCourse } from "@/app/lib/data";
import EditCourseModal from "@/app/ui/profile/edit-course-modal";

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const course = await getCourse(parseInt(id, 10))
    return (
        < EditCourseModal course={course} />
    );
}

