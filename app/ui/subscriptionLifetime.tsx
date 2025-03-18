'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { createCheckoutSessionLifetime } from '@/app/lib/actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

declare global {
    interface Window {
        promotekit_referral: any;
    }
}

export function SubscribeButtonLifetime({ priceId }: { priceId: string }) {
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        try {
            setLoading(true);
            const { sessionId } = await createCheckoutSessionLifetime(priceId, window.promotekit_referral);
            const stripe = await stripePromise;
            await stripe?.redirectToCheckout({ sessionId });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            color='primary'
            onClick={handleSubscribe}
            isDisabled={loading}
        >
            {loading ? (
                <>
                    <Spinner color="white" />
                    Please Wait
                </>
            ) : 'Subscribe'}
        </Button>
    );
}