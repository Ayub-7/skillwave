import CreateCourseModal from "@/app/ui/profile/create-course-modal";
import { getUser } from "@/app/lib/data";
import { auth } from "@/auth"
import { redirect } from 'next/navigation';

export default async function Page() {
    const session = await auth();
    if (!session) {
        redirect('/login')
    }
    const user = await getUser(session?.user?.id)
    return (<CreateCourseModal user={user} />
    );
}