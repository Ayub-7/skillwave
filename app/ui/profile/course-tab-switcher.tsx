'use client'
import { Tabs, Tab } from "@nextui-org/tabs";
import CourseCard from '@/app/ui/profile/course-card';

export default function CourseTabSwitcher({ myCourses, purchasedCourses, currUserId }: any) {
    const allCourses = [...myCourses, ...purchasedCourses];

    const renderCourses = (courses: any[]) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {courses.map((course: any) => (
                <CourseCard
                    key={course.id}
                    id={course.id}
                    course={course}
                    currUserId={currUserId}
                />
            ))}
        </div>
    );

    return (
        <div className="flex w-full flex-col mt-2">
            <Tabs aria-label="Options">
                <Tab key="All" title="All">
                    <div className="h-[500px]  p-4">
                        {renderCourses(allCourses)}
                    </div>
                </Tab>
                <Tab key="Created" title="Created">
                    <div className="h-[500px] p-4">
                        {renderCourses(myCourses)}
                    </div>
                </Tab>
                <Tab key="Purchased" title="Purchased">
                    <div className="h-[500px] p-4">
                        {renderCourses(purchasedCourses)}
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}