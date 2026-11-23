"use client"
import { getSubscriptionPlan } from "@/app/lib/subscription"
import { useSession } from '@/app/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpRight } from 'lucide-react';


const UpgrateToPremiumButton = () => {
    const { data: session, isPending } = useSession()
    const userPlan = getSubscriptionPlan(session?.user)
    if (isPending && !session) {
        return <Skeleton role="status" aria-label="Loading subscription" className="mt-8 h-12 w-full rounded-xl" />
    }
    return (
        <form action="/api/checkout_sessions" method="POST">
            <section>
                <Button
                    type="submit"
                    role="link"
                    disabled={userPlan === "premium"}
                    className="mt-8 h-12 w-full gap-2 cursor-pointer rounded-xl bg-brand-700 text-white hover:bg-brand-800"
                >
                    {
                        userPlan === "premium" ? "You are a pizzahub premium member" : "Upgrade to Premium"
                    }
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                </Button>
            </section>
        </form>
    );
};

export default UpgrateToPremiumButton;
