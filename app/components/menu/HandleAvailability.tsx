"use client"
import {
  changeAvailability,
  getActiveItemsCount,
} from "@/app/lib/actions/menu-items"
import { useSession } from "@/app/lib/auth-client"
import { IMenuItem } from "@/app/Types/menu-items"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"

const HandleAvailability = ({ item }: { item: IMenuItem }) => {
  const { data: session } = useSession()
  const userPlan = session?.user?.plan || "free"
  const router = useRouter()
  const handleAvailablity = async (
    id: string,
    value: string,
    status: string
  ) => {
    try {
      if (status === "accepted") {
        if (value === "Active" && userPlan === "free") {
          const activeItems = await getActiveItemsCount()
          if (activeItems >= 3) {
            toast.add({
              title: "Active item limit reached",
              description:
                "Your free plan allows three active items. Upgrade to Premium to activate more.",
              type: "info",
            })
            router.push("/dashboard/vendor/subscription")
            return
          }
        }
        const data = {
          isActive: true,
        }
        if (value === "Active") {
          data.isActive = true
        }
        if (value === "Inactive") {
          data.isActive = false
        }
        const res = await changeAvailability(id, data)
        if (!(res.modifiedCount > 0)) {
          toast.add({
            title: "Availability not changed",
            description:
              res.message ||
              "No changes were made. Refresh the menu and try again.",
            type: "error",
          })
          return
        }
        if (res.modifiedCount > 0) {
          router.refresh()
          toast.add({
            title: "Availability updated",
            type: "success",
            description: `Your menu item is now ${value.toLowerCase()}.`,
          })
        }
      } else {
        toast.add({
          title: `Item is ${status}`,
          description:
            "Only accepted items can have their availability changed.",
          type: "error",
        })
        return
      }
    } catch {
      toast.add({
        title: "Unable to change availability",
        description: "Please refresh the menu and try again.",
        type: "error",
      })
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
