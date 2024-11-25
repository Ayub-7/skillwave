'use client';

import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
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
            onClick={handleManage}
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