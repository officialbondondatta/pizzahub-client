import { Crown, Gift } from "lucide-react";

const SubscriptionPlan = ({ plan }: { plan: string }) => {
    return (
        <span className={`mt-2 inline-flex rounded-full border border-primary/30 ${plan === "free" ? "bg-teal-500 text-white" : plan === "premium" ? "bg-yellow-400 text-slate-800 border-teal-600" : "bg-slate-500"}  px-3  text-xs font-medium capitalize`}>
            {
                plan === "free" ?
                    <div className="flex items-center gap-2">
                        <Gift className="w-5"></Gift>
                        <h2>
                            free
                        </h2>
                    </div>
                    :
                    plan === "premium" ?
                        <div className="flex items-center gap-2">
                            <Crown className="w-5"></Crown>
                            <h2>
                                premium
                            </h2>
                        </div>
                        :
                        <div className="flex items-center gap-2">
                            <Gift className="w-5"></Gift>
                            <h2>
                                free
                            </h2>
                        </div>
            }

        </span>
    );
};

export default SubscriptionPlan;