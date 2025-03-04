'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, Tabs, Tab, Button } from "@heroui/react"
import { SubscribeButton } from '@/app/ui/subscribeButton';
import { ManageSubscriptionButton } from '@/app/ui/manageSubscriptionButton';
import { CircleCheck, ArrowRight } from 'lucide-react';

export default function SubscriptionCards({ user, pricingOptions }: any) {
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const currentPricing = pricingOptions[billingCycle];

    const login = () => {
        router.push(`/login`);
    };

    return (
        <>
            <div className="flex justify-center">
                <Card className="w-full max-w-sm">
                    <CardBody className="p-5">
                        <div className="flex flex-col gap-6">
                            <div className="flex justify-center">
                                <Tabs
                                    aria-label="Billing Cycle"
                                    selectedKey={billingCycle}
                                    onSelectionChange={(key) => setBillingCycle(key as 'monthly' | 'yearly')}
                                >
                                    <Tab key="monthly" title="Monthly" />
                                    <Tab key="yearly" title="Yearly" />
                                </Tabs>
                            </div>

                            <div>
                                <h3 className="text-xl font-medium text-center">One Simple Plan!</h3>
                                <p className="text-small text-default-500 text-center">
                                    Everything you need to create courses!
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <div className="flex items-baseline gap-1 justify-center">
                                    <span className="text-3xl font-bold">${currentPricing.price}</span>
                                    <span className="text-small text-default-500">{currentPricing.description}</span>
                                </div>
                                {!user?.subscription && (
                                    <span className="text-sm font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        ⭐ 14-day free trial
                                    </span>
                                )}
                            </div>

                            {billingCycle === 'yearly' && (
                                <p className="text-medium text-green-600 text-center">
                                    Save $100 per year!
                                </p>
                            )}

                            <div className="space-y-4">
                                <div className="text-small text-default-500">Includes:</div>
                                <ul className="space-y-2.5">
                                    <li className="flex items-center gap-2">
                                        <CircleCheck color='green' />
                                        <span className="text-small">All Features</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CircleCheck color='green' />
                                        <span className="text-small">Unlimited Courses</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CircleCheck color='green' />
                                        <span className="text-small">Affiliate Program</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CircleCheck color='green' />
                                        <span className="text-small">3.7% Transaction Fee</span>
                                    </li>
                                </ul>
                            </div>

                            {user ? (
                                user.subscription ? (
                                    <div>
                                        <p>Status: {user.subscription.status}</p>
                                        <div className="mt-4">
                                            <ManageSubscriptionButton />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <p>No active subscription</p>
                                        <div className="mt-4">
                                            <SubscribeButton priceId={currentPricing.priceId as any} />
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className="space-y-2 w-full">
                                    <Button
                                        color='primary'
                                        endContent={<ArrowRight />}
                                        onPress={login}
                                        className="w-full"
                                    >
                                        Get Started for Free
                                    </Button>
                                    <p className="text-sm text-default-500 text-center">
                                        Cancel anytime during your trial.
                                    </p>
                                </div>
                            )}

                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="flex justify-center">
                <div className='mt-6 text-center'>
                    <p className="text-md text-default-500 font-bold mb-3">We offer the cheapest transaction fees:</p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-xs">Patreon</span>
                            <span className="font-bold text-sm">14%</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs">Gumroad</span>
                            <span className="font-bold text-sm">14%</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs">Kajabi</span>
                            <span className="font-bold text-sm">4.9%</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs">Udemy</span>
                            <span className="font-bold text-sm">3% - 63%</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xs">Skill Wave</span>
                            <span className="font-bold text-sm">3.7%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}