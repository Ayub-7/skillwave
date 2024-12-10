import { Card, CardHeader, CardBody, Button } from "@nextui-org/react"
import { SubscribeButton } from '@/app/ui/subscribeButton';
import { ManageSubscriptionButton } from '@/app/ui/manageSubscriptionButton';
import { LinkAccountButton } from '@/app/ui/linkAccountButton';
import { DashboardButton } from '@/app/ui/dashboardButton';
import { redirect } from 'next/navigation'
import { auth } from "@/auth"
import { getUser } from "@/app/lib/data"
import { CreateStripeAccoutnLink, GetStripeDashboardLink } from "@/app/lib/actions";

export default async function BillingRoute() {
    const session = await auth()
    if (!session) {
        redirect('/login')
    }

    const user = await getUser(session.user?.id)
    if (!user) {
        redirect('/login')
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
            <div>
                <h2 className="text-xl font-bold">Billing</h2>
                <p className="text-small text-default-500">
                    Manage your subscription and view stripe dashboard. <b>(Stripe account must be linked before publishing course)</b>
                </p>
            </div>


            {!user.stripeConnectedLinked && (
                <form action={CreateStripeAccoutnLink}>
                    <LinkAccountButton />
                </form>
            )}

            {user.stripeConnectedLinked && (
                <form action={GetStripeDashboardLink}>
                    <DashboardButton />
                </form>
            )}

            <div className="flex justify-center">
                <Card className="w-full max-w-sm">
                    <CardBody className="p-5">
                        <div className="flex flex-col gap-6">
                            <div>
                                <h3 className="text-xl font-medium">Freelancer</h3>
                                <p className="text-small text-default-500">
                                    All the basics for starting a new business
                                </p>
                            </div>

                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold">$35</span>
                                <span className="text-small text-default-500">/month</span>
                            </div>

                            <div className="space-y-4">
                                <div className="text-small text-default-500">Includes:</div>
                                <ul className="space-y-2.5">
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-default-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-small">Unlimited clients</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-default-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-small">Custom branding</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-default-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-small">Analytics dashboard</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <svg className="w-4 h-4 text-default-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-small">Email support</span>
                                    </li>
                                </ul>
                            </div>

                            {user.subscription ? (
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
                                        <SubscribeButton priceId="price_1QNwWaKSorwSxJrUTM5MMb4r" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}