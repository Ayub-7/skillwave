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
        <div className="flex min-h-screen">
            {/* Sidebar for larger screens */}
            <div className="hidden md:block">
                <SectionsBar
                    price={course.price}
                    sections={course.Sections}
                    courseId={id}
                    hasAccess={hasAccess}
                />
            </div>

            {/* Main Content with mobile bottom bar */}
            <div className="flex-1 flex flex-col relative">
                {children}

                {/* Mobile Bottom Bar - Absolute positioned at bottom */}
                <div className="md:hidden absolute bottom-0 left-0 w-full z-50 text-center flex justify-center items-center">
                    <SectionButtons
                        price={course.price}
                        sections={course.Sections}
                        courseId={id}
                        hasAccess={hasAccess}
                    />
                </div>
            </div>
        </div >
    );
}
