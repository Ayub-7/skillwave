import React from 'react';
import SectionsBar from '@/app/ui/course/sections-bar';
import { getCourse } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Layout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    const { id } = params;
    const course = await getCourse(id); // Fetch data

    if (!course) {
        notFound(); // Handle the case where course is not found
        return null; // This is to satisfy TypeScript that nothing will be rendered if course is null
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar with Course Sections */}
            <SectionsBar sections={course.Sections} courseId={id} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {children}
            </div>
        </div>
    );
}
