'use client';

import { useState } from 'react';
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { CreateStripeAccoutnLink } from '@/app/lib/actions';

export function LinkAccountButton() {
    const [loading, setLoading] = useState(false);

    const handleManage = async () => {
        try {
            setLoading(true);
            const { url } = await CreateStripeAccoutnLink();
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
            ) : 'Link your account to stripe'}
        </Button>
    );
}