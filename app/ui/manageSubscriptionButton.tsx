'use client';

import { useState } from 'react';
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { manageSubscription } from '@/app/lib/actions';

export function ManageSubscriptionButton() {
    const [loading, setLoading] = useState(false);

    const handleManage = async () => {
        try {
            setLoading(true);
            const { url } = await manageSubscription();
            window.location.href = url;
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            color='primary'
            onClick={handleManage}
            isDisabled={loading}
        >
            {loading ? (
                <>
                    <Spinner color="white" />
                    Please Wait
                </>
            ) : 'Manage subscription'}
        </Button>
    );
}