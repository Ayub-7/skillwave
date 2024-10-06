'use client'
import Image from 'next/image';
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

const AppShowcase = () => {
    const { theme } = useTheme();
    const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (theme) {
            setCurrentTheme(theme);
        }
    }, [theme]);

    if (!currentTheme) return null;
    const showcaseItems = [
        {
            imageSrc: `/main-feed-${currentTheme}.png`,
            alt: "Main feed with top courses",
            title: "Discover Top Courses",
            description: "Browse a curated selection of top-rated courses across various categories. Our intuitive main feed helps you find the perfect course to boost your skills and advance your career."
        },
        {
            imageSrc: `/profile-page-${currentTheme}.png`,
            alt: "User profile page",
            title: "Personalized Profile",
            description: "Take control of your courses with our comprehensive management tools. Easily track and update course content all in one place. Manage your instructor profile to build your teaching brand."
        },
        {
            imageSrc: `/course-builder-${currentTheme}.png`,
            alt: "Course builder interface",
            title: "Powerful Course Creator",
            description: "Create engaging courses with our user-friendly course builder. Add lessons, upload materials, and customize your course structure with ease. Our rich text editor and file management system make course creation a breeze."
        },
        {
            imageSrc: `/course-preview-${currentTheme}.png`,
            alt: "Course preview page",
            title: "Attractive Course Previews",
            description: "Entice potential students with beautiful course preview pages. Highlight key learning outcomes, showcase your curriculum, and provide a sneak peek of your content to increase enrollments."
        }
    ];

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">Empower Your Teaching with Skill Wave</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {showcaseItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }} // Initial state
                            animate={{ opacity: 1, y: 0 }} // Animation when mounted
                            transition={{ duration: 0.5, delay: index * 0.2 }} // Delayed animation for each item
                            className="rounded-lg shadow-md overflow-hidden"
                        >
                            <Image
                                src={item.imageSrc}
                                alt={item.alt}
                                width={600}
                                height={400}
                                layout="responsive"
                                className="object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AppShowcase;