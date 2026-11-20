"use client"
import { useSession } from '@/app/lib/auth-client';
import { Button } from '@/components/ui/button';


const SwtichToFreeButton = () => {
    const { data: session } = useSession()
    const userPlan = session?.user?.plan
    const handleSwitchingPlan = () => {
        console.log("swtich to free")
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