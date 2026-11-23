"use client"

import Image from "next/image"
import type { IOrder } from "@/app/Types/order"
import { useRef, useState, type FormEvent } from "react"
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
import { CheckCircle2, LoaderCircle, ShoppingBag } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { createOrder } from "@/app/lib/actions/order"

export default function OrderNowButton({ item }: { item: IMenuItem }) {
  const [open, setOpen] = useState(false)
  const [paymentState, setPaymentState] = useState<"ready" | "processing" | "completed">("ready")
  const submitting = useRef(false)
  const { data: session, isPending } = useSession()
  const customer = session?.user
  if (!customer) return null
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || paymentState !== "ready") return
    const form = event.currentTarget
    const formData = new FormData(form)
    const address = String(formData.get("deliveryAddress") || "").trim()

    if (!address) {
      toast.add({ title: "Enter a delivery address", type: "error" })
      return
    }
    submitting.current = true
    setPaymentState("processing")

    const order: IOrder = {
      customerId: customer?.id ?? "",
      vendorId: item.vendorId,
      menuItemId: item._id as string,
      deliveryDate: String(formData.get("deliveryDate") || ""),
      deliveryAddress: address,
      additionalMessage: String(formData.get("additionalMessage") || "").trim(),
      status: "pending",
    }
    try {
      const result = await createOrder(order)
      if (!result.insertedId) {
        setPaymentState("ready")
        toast.add({
          title: "Unable to place order",
          description:
            result.message || "Please check your order details and try again.",
          type: "error",
        })
        return
      }
      toast.add({
        title: "Order placed",
        description: "Your order is waiting for the vendor to accept it.",
        type: "success",
      })
      setPaymentState("completed")
    } catch {
      setPaymentState("ready")
      toast.add({
        title: "Unable to place order",
        description:
          "Check your connection and try again. Your details have been kept.",
        type: "error",
      })
    } finally {
      submitting.current = false
    }
  }

    return (
        <Dialog open={open} onOpenChange={(nextOpen) => {
            if (submitting.current) return
            setOpen(nextOpen)
            if (nextOpen) setPaymentState("ready")
        }}>
            <DialogTrigger
                render={<Button className="h-12 w-full" disabled={isPending} />}
            >
                <ShoppingBag aria-hidden="true" />
                Order now
            </DialogTrigger>
            <DialogContent showCloseButton={paymentState !== "processing"} className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
                {paymentState === "processing" ? (
                    <div role="status" className="space-y-5 py-8 text-center">
                        <LoaderCircle aria-hidden="true" className="mx-auto size-10 animate-spin motion-reduce:animate-none text-primary" />
                        <DialogHeader>
                            <DialogTitle>Processing payment</DialogTitle>
                            <DialogDescription>Saving your order. This is a demo payment; no money is charged.</DialogDescription>
                        </DialogHeader>
                    </div>
                ) : paymentState === "completed" ? (
                    <>
                        <CheckCircle2 aria-hidden="true" className="mx-auto mt-4 size-12 text-primary" />
                        <DialogHeader className="text-center">
                            <DialogTitle>Payment completed</DialogTitle>
                            <DialogDescription>Your order has been placed and is waiting for the vendor to accept it. This was a demo payment; no money was charged.</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose render={<Button />}>Done</DialogClose>
                        </DialogFooter>
                    </>
                ) : null}
                <div hidden={paymentState !== "ready"} className="space-y-4">
                <DialogHeader>
                    <DialogTitle>Order {item.name}</DialogTitle>
                    <DialogDescription>
                        Choose your delivery details and confirm payment. Demo payment only — no money will be charged.
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
                <div className="flex items-center justify-between rounded-xl border p-4 font-semibold">
                    <span>Total to pay</span>
                    <span>৳{item.price.toLocaleString("en-BD")}</span>
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
                        <Button type="submit" disabled={paymentState !== "ready"}>Pay ৳{item.price.toLocaleString("en-BD")}</Button>
                    </DialogFooter>
                </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
