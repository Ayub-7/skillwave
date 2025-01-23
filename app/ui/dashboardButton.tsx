'use client';

import { useState } from 'react';
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { GetStripeDashboardLink } from '@/app/lib/actions';

export function DashboardButton() {
    const [loading, setLoading] = useState(false);

    const handleManage = async () => {
        try {
            setLoading(true);
            const { url } = await GetStripeDashboardLink();
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
            onPress={handleManage}
            isDisabled={loading}
        >
            {loading ? (
                <>
                    <Spinner color="white" />
                    Please Wait
                </>
            ) : 'View Dashboard'}
        </Button>
    );
}