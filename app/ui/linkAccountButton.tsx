'use client';

import { useState } from 'react';
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
        <button
            onClick={handleManage}
            disabled={loading}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
            {loading ? 'Loading...' : 'Link your Account to Stripe'}
        </button>
    );
}