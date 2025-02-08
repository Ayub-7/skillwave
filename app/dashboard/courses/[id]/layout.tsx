import React from 'react';
import SectionsBar from '@/app/ui/course/sections-bar';
import SectionButtons from '@/app/ui/course/section-buttons';
import { getCourse, getUser } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { auth } from "@/auth"


export default async function Layout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    const { id } = params;
    const session = await auth()
    const course = await getCourse(id);
    let hasAccess = false // Fetch data

    if (!course) {
        notFound(); // Handle the case where course is not found
        return null; // This is to satisfy TypeScript that nothing will be rendered if course is null
    }
    if (session) {
        const user = await getUser(session.user?.id)
        if (user?.purchasedCourses.includes(id) || user?.id === course.authorId) {
            hasAccess = true
        }
    }

    return (
        <div className="flex min-h-screen relative">
            {/* Desktop view */}
            <div className="hidden md:block">
                <SectionsBar
                    sections={course.Sections}
                    courseId={id}
                    hasAccess={hasAccess}
                    defaultCollapsed={false}
                />
            </div>

            {/* Mobile view - with added spacing and positioning */}
            <div className="md:hidden absolute left-0 top-0 w-full z-50">
                <SectionsBar
                    sections={course.Sections}
                    courseId={id}
                    hasAccess={hasAccess}
                    defaultCollapsed={true}
                />
            </div>

            {/* Main content with padding to prevent overlap */}
            <div className="flex-1 md:pl-0 pl-12"> {/* Added left padding for mobile */}
                {children}
            </div>
        </div>
    )
}
