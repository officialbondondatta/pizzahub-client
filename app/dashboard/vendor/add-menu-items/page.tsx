"use client"
import { useEffect, useRef, useState, type FormEvent } from "react"
import Image from "next/image"
import { Clock3, LoaderIcon, Pizza } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import familyPizza from "@/app/assets/signin-family.png"
import { useSession } from "@/app/lib/auth-client"
import { toast } from "@/components/ui/toast"
import { addMenuItems } from "@/app/lib/actions/menu-items"
import { IMenuItem } from "@/app/Types/menu-items"

type ItemStatus = "pending" | "accepted" | "rejected"
const initialStatus: ItemStatus = "pending"
const inputClass = "h-11 rounded-xl bg-background"
import { menuCategories as categories } from "@/app/lib/menu-categories"

export default function AddMenuItems() {
  const { data: session } = useSession()
  const user = session?.user
  const [uploading, setUplaoding] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const submitting = useRef(false)
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  const handleUploadToImgBB = async (file: File): Promise<string> => {
    const formdata = new FormData()
    formdata.append("image", file)

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
      {
        method: "POST",
        body: formdata,
      }
    )
    const data = await res.json()
    if (!res.ok || !data.success || !data.data?.url)
      throw new Error("Image upload failed. Please try again.")
    return data.data.url
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    submitting.current = true
    setUplaoding(true)
    setLoading(true)
    if (!user) {
      toast.add({
        title: "You can not add items",
        description: "Only vendors can add menu items",
      })
      setUplaoding(false)
      setLoading(false)
      submitting.current = false
      return
    }
    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      const imageFile = formData.get("image")
      if (!(imageFile instanceof File) || imageFile.size === 0) {
        toast.add({
          title: "Image not found",
          description: "Upload a image of your menu item",
        })
        setUplaoding(false)
        return
      }
      const imageURL = await handleUploadToImgBB(imageFile)
      const itemDetails: IMenuItem = {
        name: String(formData.get("name") ?? ""),
        category: String(formData.get("category") ?? ""),
        description: String(formData.get("description") ?? ""),
        location: String(formData.get("location") ?? ""),
        price: Number(formData.get("price")),
        status: initialStatus,
        isActive: false,
        vendorId: user.id,
        image: imageURL,
      }
      const res = await addMenuItems(itemDetails)
      if (!res.insertedId)
        throw new Error("The menu item was not saved. Please try again.")
      if (res.insertedId) {
        setUplaoding(false)
        setLoading(false)
        form.reset()
        setImagePreview(null)
        toast.add({
          title: "Item added successfully",
          type: "success",
          description: "Wait for admin approval",
        })
      }
    } catch (err) {
      toast.add({
        title: "Unable to add menu item",
        type: "error",
        description:
          err instanceof Error ? err.message : "Something went wrong",
      })
    } finally {
      submitting.current = false
      setLoading(false)
      setUplaoding(false)
    }
  }

    return (
        <div className="mx-auto max-w-6xl">
            <Dialog open={loading}>
                <DialogContent showCloseButton={false}>
                    <div role="status" className="space-y-5 py-6 text-center">
                        <LoaderIcon aria-hidden="true" className="mx-auto size-10 animate-spin motion-reduce:animate-none text-primary" />
                        <DialogHeader>
                            <DialogTitle>Uploading menu item</DialogTitle>
                            <DialogDescription>Please wait while we upload your photo and save your menu item.</DialogDescription>
                        </DialogHeader>
                    </div>
                </DialogContent>
            </Dialog>
            <div className="mb-7">
                <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    Your kitchen · Your creations
                </p>
                <h1 className="text-3xl font-bold tracking-tight">Add menu item</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Give your next customer something delicious to discover.
                </p>
            </div>
            <div className="grid overflow-hidden rounded-2xl border bg-card shadow-sm lg:grid-cols-[1fr_0.65fr]">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 p-5 sm:p-8"
                >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-5">
                        <div>
                            <h2 className="text-lg font-semibold">Item details</h2>
                            <p className="mt-1 text-xs text-muted-foreground">
                                All fields are required.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/20 px-3 py-1.5 text-xs font-medium">
                            <Clock3 className="size-3.5" aria-hidden="true" />
                            Pending review
                        </span>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="item-name">Item name</Label>
                        <Input
                            id="item-name"
                            name="name"
                            placeholder="e.g. Smoky BBQ Chicken Pizza"
                            required
                            pattern=".*\S.*"
                            maxLength={120}
                            className={inputClass}
                        />
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                name="category"
                                defaultValue=""
                                required
                                className={`${inputClass} w-full min-w-0 border border-input px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50`}
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price (BDT)</Label>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                inputMode="decimal"
                                onKeyDown={(event) => {
                                    if (["e", "E", "+", "-"].includes(event.key)) {
                                        event.preventDefault()
                                    }
                                }}
                                onPaste={(event) => {
                                    if (!/^\d+(\.\d+)?$/.test(event.clipboardData.getData("text"))) {
                                        event.preventDefault()
                                    }
                                }}
                                min="0.01"
                                step="0.01"
                                placeholder="650"
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Tell customers about the flavors, toppings, and what makes this item special."
                            required
                            maxLength={1500}
                            rows={4}
                            onChange={(event) =>
                                event.currentTarget.setCustomValidity(
                                    event.currentTarget.value.trim()
                                        ? ""
                                        : "Please enter a description."
                                )
                            }
                            className="w-full resize-y rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location (area / city)</Label>
                        <Input
                            id="location"
                            name="location"
                            placeholder="e.g. Dhanmondi, Dhaka"
                            required
                            pattern=".*\S.*"
                            maxLength={150}
                            className={inputClass}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="item-image">Item image</Label>
                        <div className="min-w-0 rounded-xl border border-dashed border-input bg-background/50 p-4">
                            <Input
                                id="item-image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                    const file = event.currentTarget.files?.[0]
                                    setImagePreview(file ? URL.createObjectURL(file) : null)
                                }}
                                required
                                disabled={uploading}
                                aria-describedby="image-help"
                                className="h-11 w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap border-0 bg-transparent p-0 text-sm shadow-none file:mr-3 file:h-11 file:cursor-pointer file:rounded-lg file:bg-primary/30 file:px-3 file:py-0 file:leading-11 dark:bg-transparent"
                            />
                            <p
                                id="image-help"
                                className="mt-2 text-xs leading-5 text-muted-foreground"
                            >
                                {uploading ? "Uploading your image" : "Choose a photo of your item"}
                            </p>
                            {imagePreview && (
                                <div className="relative mt-4 h-56 overflow-hidden rounded-lg border bg-muted">
                                    <Image
                                        src={imagePreview}
                                        alt="Preview of your selected menu item image"
                                        fill
                                        unoptimized
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Input
                            id="status"
                            name="status"
                            value={initialStatus}
                            readOnly
                            aria-describedby="status-help"
                            className={`${inputClass} bg-muted text-muted-foreground capitalize`}
                        />
                        <p id="status-help" className="text-xs text-muted-foreground">
                            New items start as pending. After submission wait for admin approval.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="is-active">Availability</Label>
                        <Input
                            id="is-active"
                            value="Inactive"
                            disabled
                            aria-describedby="availability-help"
                            className={`${inputClass} bg-muted text-muted-foreground`}
                        />
                        <p id="availability-help" className="text-xs text-muted-foreground">
                            New items are always added as inactive.
                        </p>
                    </div>
                    <div className="border-t pt-5">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-11 w-full rounded-xl bg-brand-700 px-6 text-white hover:bg-brand-800 sm:w-auto"
                        >
                            {loading ?
                                <>
                                    <LoaderIcon></LoaderIcon>
                                    <span>
                                        adding item to menu
                                    </span>
                                </>
                                : "Add item to menu"}
                        </Button>
                    </div>
                </form>
                <aside className="relative isolate hidden min-h-full overflow-hidden bg-brand-950 lg:flex lg:items-end">
                    {/* Prevent React's automatic eager-image preload for this responsive aside. */}
                    <picture className="absolute inset-0 -z-20">
                        <Image
                            src={familyPizza}
                            alt="A family enjoying pizza together at a warm, welcoming restaurant"
                            fill
                            loading="eager"
                            sizes="(min-width: 1024px) 40vw, 1px"
                            className="object-cover object-top"
                        />
                    </picture>
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950 via-brand-950/10 to-transparent"
                    />
                    <div className="p-8 text-brand-50">
                        <Pizza className="mb-4 size-8 text-brand-300" aria-hidden="true" />
                        <p className="font-serif text-3xl leading-tight font-bold">
                            Your food.
                            <br />
                            Their next favorite moment.
                        </p>
                        <p className="mt-4 text-sm leading-6 text-brand-100/80">
                            From your kitchen to a table full of smiles. Every great pizza
                            night starts with a great menu.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    )
}
