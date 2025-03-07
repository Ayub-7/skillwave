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
        if (user?.id !== course.authorId && course.status !== "PUBLISHED") {
            notFound();
            return null;
        }
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

            {/* Main Content with mobile bottom bar */}
            <div className="flex-1 flex flex-col">
                {/* Children content - add negative margin to counteract WYSIWYG spacing */}
                <div className="mb-[-1.5rem]">  {/* or try -2rem if -1.5rem isn't enough */}
                    {children}
                </div>

                {/* Mobile Bottom Bar */}
                <div className="md:hidden w-full px-4 flex flex-col items-center">
                    <h3 className="font-bold">Course Content</h3>
                    <SectionButtons
                        sections={course.Sections}
                        courseId={id}
                        hasAccess={hasAccess}
                    />
                </div>
            </div>
        </div>
    );
}
