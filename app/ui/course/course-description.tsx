'use client';

import { useState } from 'react';
import Tiptap from "@/app/components/tiptap";

export default function CourseDescription({ description }: { description: string }) {
    const [showMore, setShowMore] = useState(false);
    const previewLength = 300; // Adjust for your preferred snippet length
    const preview = description.slice(0, previewLength);

    return (
        <div className="text-center">
            {/* Display the description content */}
            <Tiptap
                canEdit={false}
                description={showMore ? description : `${preview}......`}
            />

            {/* Toggle button */}
            {description.length > previewLength && (
                <div className="text-center">
                    <button
                        onClick={() => setShowMore(!showMore)}
                        className="text-blue-500 hover:underline focus:outline-none font-medium mb-2"
                    >
                        {showMore ? "Show less" : "Show more"}
                    </button>
                </div>
            )}
        </div>
    );
}
