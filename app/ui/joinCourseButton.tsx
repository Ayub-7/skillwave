'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { joinCourse } from '@/app/lib/actions';

export function JoinCourseButton({ courseId }: { courseId: string }) {
    const [loading, setLoading] = useState(false);

    const handleManage = async () => {
        try {
            setLoading(true);
            await joinCourse(courseId);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
            toast.success('Successfully joined course!', {
                duration: 3000,
                position: 'top-right',
                style: { zIndex: 9999 },
            });
        }
    };

    return (
        <Button
            color='primary'
            onClick={handleManage}
            isDisabled={loading}
            className='mt-6'
        >
            {loading ? (
                <>
                    <Spinner color="white" />
                </>
            ) : 'Join Now!'}
        </Button>
    );
}