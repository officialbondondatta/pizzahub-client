"use client"
import { changeAvailability, getActiveItemsCount } from '@/app/lib/actions/menu-items';
import { useSession } from '@/app/lib/auth-client';
import { IMenuItem } from '@/app/Types/menu-items';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';

const HandleAvailability = ({ item }: { item: IMenuItem }) => {
    const { data: session } = useSession()
    const userPlan = session?.user?.plan || "free"
    const router = useRouter()
    const handleAvailablity = async (id: string, value: string, status: string) => {
        if (status === 'accepted') {
            if (value === "Active" && userPlan === "free") {
                const activeItems = await getActiveItemsCount()
                if (activeItems >= 3) {
                    toast.add({
                        title: "Subscribe to Pizzahub Premium to active more items"
                    })
                    router.push('/dashboard/vendor/subscription')
                    return
                }
            }
            const data = {
                isActive: true
            }
            if (value === "Active") {
                data.isActive = true
            }
            if (value === "Inactive") {
                data.isActive = false
            }
            const res = await changeAvailability(id, data)
            if (res.modifiedCount > 0) {
                router.refresh()
                toast.add({
                    title: "Successful",
                    description: "Item availablity changed"
                })
            }
        }
        else {
            toast.add({
                title: `Item is ${status}`,
                description: "Availability change unsuccessful"
            })
            return
        }
    }
    return (
        <Select
            value={item.isActive ? "Active" : "Inactive"}
            onValueChange={(value) => handleAvailablity(item._id as string, value as string, item.status)
            }
        >
            <SelectTrigger
                aria-label={`Availability for ${item.name}`}
                className="min-w-28 bg-background data-[size=default]:h-10"
            >
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default HandleAvailability;
