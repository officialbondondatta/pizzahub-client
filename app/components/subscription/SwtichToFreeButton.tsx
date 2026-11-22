"use client"
import { getSubscriptionPlan } from "@/app/lib/subscription"
import { useSession } from '@/app/lib/auth-client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';


const SwtichToFreeButton = () => {
    const { data: session } = useSession()
    const userPlan = getSubscriptionPlan(session?.user)
    const handleSwitchingPlan = () => {
        toast.add({
            title: "Not available now",
            description: "Feature will be available soon"
        })
    }

    return (
        <Button disabled={userPlan === "free"} className={`mt-8  rounded-xl cursor-pointer disabled:cursor-not-allowed bg-muted/60 px-4 py-5 text-center text-sm text-muted-foreground`} onClick={handleSwitchingPlan}>
            {
                userPlan === "free" ?
                    <>
                        Current Plan
                    </>
                    :
                    userPlan === "premium" ?
                        <>
                            Switch Back to Free
                        </>
                        :
                        "Current Plan"
            }
        </Button>
    );
};

export default SwtichToFreeButton;