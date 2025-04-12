import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function BlogPage() {
    const blogs = [
        {
            emoji: "💡",
            title: "How to Turn Your Expertise into a Profitable Online Course in 2025",
            description:
                "A practical guide to transforming your skills into an income-generating online course this year.",
            link: "/blogs/turn-expertise-into-online-course",
        },
        {
            emoji: "🚀",
            title: "How to Market Your Online Course Without a Big Audience",
            description:
                "Smart strategies to successfully launch and sell your course, even if you're starting from scratch.",
            link: "/blogs/market-online-course-without-followers",
        },
        {
            emoji: "🗓️",
            title: "From Idea to Launch: A 30-Day Roadmap for Creating Your First Online Course",
            description:
                "Follow this no-fluff 4-week plan to go from course idea to live product, step by step.",
            link: "/blogs/online-course-roadmap-30-days",
        },
    ];

    return (
        <>
            <Head>
                <title>Tips for Course Creators</title>
                <meta
                    name="description"
                    content="Explore blog posts on how to create, launch, and grow your online course. Actionable tips for creators of all levels."
                />
                <meta name="keywords" content="course creation blog, online course tips, skill wave blog" />
                <meta name="author" content="Skill Wave" />
            </Head>
            <div className="max-w-5xl mx-auto px-4 py-16">
                <div className="grid gap-8 sm:grid-cols-2">
                    {blogs.map((blog, index) => (
                        <Link key={index} href={blog.link}>
                            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer bg-white dark:bg-gray-900">
                                <div className="text-3xl mb-2">{blog.emoji}</div>
                                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{blog.title}</h2>
                                <p className="text-gray-600 dark:text-gray-300">{blog.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}