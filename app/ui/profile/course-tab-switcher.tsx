'use client'
import { Tabs, Tab } from "@nextui-org/tabs";
import CourseCard from '@/app/ui/profile/course-card';

export default function CourseTabSwitcher({ myCourses, purchasedCourses }: any) {
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options">
                <Tab key="Purchased" title="Purchased">
                    {purchasedCourses.map((course: any) => (
                        <CourseCard
                            key={course.id}
                            title={course.name}
                            imageUrl={course.imageUrl}
                            price={course.price}
                        />
                    ))}
                </Tab>
                <Tab key="Created" title="Created">
                    {myCourses.map((course: any) => (
                        <CourseCard
                            key={course.id}
                            title={course.name}
                            imageUrl={course.imageUrl}
                            price={course.price}
                        />
                    ))}
                </Tab>
            </Tabs>
        </div>
    );
}
