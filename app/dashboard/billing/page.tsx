import { LinkAccountButton } from '@/app/ui/linkAccountButton';
import { DashboardButton } from '@/app/ui/dashboardButton';
import { redirect } from 'next/navigation'
import { auth } from "@/auth"
import { getUser } from "@/app/lib/data"
import { CreateStripeAccoutnLink, GetStripeDashboardLink } from "@/app/lib/actions";
import SubscriptionCards from "@/app/ui/subscriptionCards"

export default async function BillingRoute() {

    const pricingOptions = {
        monthly: {
            price: 25,
            priceId: process.env.NODE_ENV === "production" ? process.env.PRICE_ID_PROD : process.env.PRICE_ID_DEV,
            description: "per month"
        },
        yearly: {
            price: 200,
            priceId: process.env.NODE_ENV === "production" ? process.env.PRICE_ID_YEARLY_PROD : process.env.PRICE_ID_YEARLY_DEV,
            description: "per year"
        }
    };

    const session = await auth()
    let user = null
    if (session) {
        user = await getUser(session.user?.id)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
            {session && (
                <div>
                    <h2 className="text-xl font-bold">Billing</h2>
                    <p className="text-small text-default-500 mb-2">
                        Manage your subscription and view stripe dashboard.{" "}
                        {user?.subscription && <b>(Stripe account must be linked before publishing course)</b>}
                    </p>

                    {!user?.stripeConnectedLinked && user?.subscription && (
                        <form action={CreateStripeAccoutnLink}>
                            <LinkAccountButton />
                        </form>
                    )}

                    {user?.stripeConnectedLinked && (
                        <form action={GetStripeDashboardLink}>
                            <DashboardButton />
                        </form>
                    )}
                </div>
            )}

            <SubscriptionCards user={user} pricingOptions={pricingOptions} />
        </div>

    )
}