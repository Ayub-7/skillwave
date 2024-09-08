import CreateCourseModal from "@/app/ui/profile/create-course-modal";
import { getSession, getUser } from "@/app/lib/data";


export default async function Page() {
    const session = await getSession() || '';
    const JsonSession = JSON.parse(session);
    const user = await getUser(JsonSession.user.id)
    return (<CreateCourseModal user={user} />
    );
}