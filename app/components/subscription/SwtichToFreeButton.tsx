"use client"
import { getSubscriptionPlan } from "@/app/lib/subscription"
import { useSession } from '@/app/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/toast';
import { cancelSubscription } from "@/app/lib/actions/subscription";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";


const SwtichToFreeButton = () => {
    const { data: session, isPending, refetch } = useSession()
    const [isSwitching, setIsSwitching] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const switching = useRef(false)
    const router = useRouter()
    const userPlan = getSubscriptionPlan(session?.user)
    const user = session?.user?.id
    const handleSwitchingPlan = async () => {
        if (switching.current || userPlan === "free") return
        if (!user) {
            toast.add({ title: "Please sign in to change your plan", type: "error" })
            return
        }
        switching.current = true
        setIsSwitching(true)
        setConfirmOpen(false)
        try {
            const result = await cancelSubscription(user)
            if (!(result.modifiedCount > 0 || result.matchedCount > 0)) {
                toast.add({
                    title: "Unable to change plan",
                    description: result.message || "Please try again.",
                    type: "error",
                })
                return
            }
            toast.add({
                title: "Switched to Free",
                description: "Your account is now on the free plan.",
                type: "success",
            })
            await refetch({ query: { disableCookieCache: true } })
            router.refresh()
        } catch {
            toast.add({
                title: "Unable to update subscription",
                description: "Refresh the page to check your current plan before trying again.",
                type: "error",
            })
        } finally {
            switching.current = false
            setIsSwitching(false)
        }
    }

    if (isPending && !session) {
        return <Skeleton role="status" aria-label="Loading subscription" className="mt-8 h-10 w-36 rounded-xl" />
    }

    return (
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogTrigger render={<Button disabled={isPending || isSwitching || !user || userPlan === "free"} aria-busy={isSwitching} className="mt-8 rounded-xl cursor-pointer disabled:cursor-not-allowed bg-muted/60 px-4 py-5 text-center text-sm text-muted-foreground" />}>
            {
                isSwitching ? "Switching to Free…" : userPlan === "free" ?
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
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    Switching back to Free will end your Premium benefits immediately.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose render={<Button variant="outline" />}>
                    Keep Premium
                </DialogClose>
                <Button onClick={handleSwitchingPlan} disabled={isSwitching}>
                    Switch to Free
                </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    );
};

export default SwtichToFreeButton;
