'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '@/app/lib/actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function SubscribeButton({ priceId }: { priceId: string }) {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            const { sessionId } = await createCheckoutSession(priceId);
            const stripe = await stripePromise;
            await stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleSubscribe}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
            {loading ? 'Loading...' : 'Subscribe'}
        </button>
    );
}