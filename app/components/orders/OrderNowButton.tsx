"use client"

import Image from "next/image"
import type { IOrder } from "@/app/Types/order"
import { useState, type FormEvent } from "react"
import type { IMenuItem } from "@/app/Types/menu-items"
import { useSession } from "@/app/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { ShoppingBag } from "lucide-react"
import { toast } from "@/components/ui/toast"

export default function OrderNowButton({ item }: { item: IMenuItem }) {
    const [open, setOpen] = useState(false)
    const { data: session, isPending } = useSession()
    const customer = session?.user
    if (!customer) {
        toast.add({
            title: "You are not logged in",
        })
        return
    }
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const address = String(formData.get("deliveryAddress") || "").trim()

        const order: IOrder = {
            customerId: customer?.id ?? "",
            vendorId: item.vendorId,
            menuItemId: item._id as string,
            deliveryDate: String(formData.get("deliveryDate") || ""),
            deliveryAddress: address,
            additionalMessage: String(formData.get("additionalMessage") || "").trim(),
            status: "Pending",
        }
        console.log("Order form", order)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={<Button className="h-12 w-full" disabled={isPending} />}
            >
                <ShoppingBag aria-hidden="true" />
                Order now
            </DialogTrigger>
            {!isPending && (
                <p className="mt-2 text-center text-sm text-muted-foreground">
                    {customer?.role !== "customer"
                        ? "Sign in as a customer to order."
                        : customer.isBlocked
                            ? "Your account is blocked."
                            : "This item is not available for ordering."}
                </p>
            )}
            <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Order {item.name}</DialogTitle>
                    <DialogDescription>
                        Choose a delivery date and tell us where to deliver your order.
                    </DialogDescription>
                </DialogHeader>
                <Image
                    src={item.image}
                    alt={item.name}
                    width={480}
                    height={240}
                    unoptimized
                    className="h-44 w-full rounded-xl object-cover"
                />
                <div className="space-y-1 rounded-xl bg-muted/50 p-4 text-sm">
                    <p className="wrap-break-word">
                        <span className="text-muted-foreground">Customer: </span>
                        {customer?.name}
                    </p>
                    <p className="wrap-break-word">
                        <span className="text-muted-foreground">Vendor: </span>
                        {item.vendorBusinessName || "Selected item's vendor"}
                    </p>
                    <p className="wrap-break-word">
                        <span className="text-muted-foreground">Selected item: </span>
                        {item.name}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="delivery-date">Delivery date</Label>
                        <Input
                            id="delivery-date"
                            name="deliveryDate"
                            type="date"
                            min={new Intl.DateTimeFormat("en-CA", {
                                timeZone: "Asia/Dhaka",
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            }).format(new Date())}
                            required
                            className="h-11"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="delivery-address">Delivery address</Label>
                        <Textarea
                            id="delivery-address"
                            name="deliveryAddress"
                            required
                            maxLength={500}
                            placeholder="House, road, area, and city"
                            onChange={(event) => event.currentTarget.setCustomValidity("")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="order-message">
                            Additional message / special instructions (optional)
                        </Label>
                        <Textarea
                            id="order-message"
                            name="additionalMessage"
                            maxLength={1000}
                            placeholder="Any special requests or delivery instructions?"
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline" type="button" />}>
                            Cancel
                        </DialogClose>
                        <Button type="submit">Submit order</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
