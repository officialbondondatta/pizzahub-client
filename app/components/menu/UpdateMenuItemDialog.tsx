"use client"

import { useId, useRef, useState } from "react"
import Image from "next/image"
import { Pencil } from "lucide-react"
import type { IMenuItem } from "@/app/Types/menu-items"
import { menuCategories } from "@/app/lib/menu-categories"
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "@/components/ui/toast"
import { updateMenuItem } from "@/app/lib/actions/menu-items"
import { useRouter } from "next/navigation"

export default function UpdateMenuItemDialog({ item }: { item: IMenuItem }) {
  const [uploading, setUploading] = useState(false)
  const [loading, setloading] = useState(false)
  const [category, setCategory] = useState(item.category)
  const [open, setOpen] = useState(false)
  const id = useId()
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
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
    if (!res.ok || !data.success || !data.data?.url) {
      throw new Error("Image upload failed. Please try again.")
    }
    return data.data.url
  }
  async function handleUpdate() {
    const form = formRef.current
    if (loading || !form || !form.reportValidity()) return
    setloading(true)
    try {
      const formData = new FormData(form)
      if (!item._id) throw new Error("Menu item ID is missing")
      const imageFile = formData.get("image")
      let imageURL = item.image
      if (imageFile instanceof File && imageFile.size > 0) {
        setUploading(true)
        imageURL = await handleUploadToImgBB(imageFile)
        setUploading(false)
      }
      const updatedItemDetails: Partial<IMenuItem> = {
        name: String(formData.get("name") ?? ""),
        category: String(formData.get("category") ?? ""),
        description: String(formData.get("description") ?? ""),
        location: String(formData.get("location") ?? ""),
        price: Number(formData.get("price")),
        image: imageURL,
      }
      const result = await updateMenuItem(item._id, updatedItemDetails)
      if (result.modifiedCount > 0) {
        toast.add({
          title: "Menu item updated",
          description: "Your menu item changes have been saved.",
          type: "success",
        })
      }
      if (!(result.modifiedCount > 0)) {
        toast.add({
          title: "No changes saved",
          description:
            result.message ||
            "The item may already have these details. Refresh and try again if needed.",
          type: "info",
        })
        return
      }
      setOpen(false)
      router.refresh()
    } catch (err) {
      toast.add({
        title: "Unable to update menu item",
        description: err instanceof Error ? err.message : "Please try again.",
        type: "error",
      })
    } finally {
      setUploading(false)
      setloading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (nextOpen) setCategory(item.category)
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label={`Update ${item.name}`}
            title="Update"
            className="size-10 border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-200 dark:hover:bg-sky-900"
          />
        }
      >
        <Pencil aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Update menu item</DialogTitle>
          <DialogDescription>
            Edit the details for {item.name}.
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={(event) => event.preventDefault()}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>Item name</Label>
            <Input
              id={`${id}-name`}
              name="name"
              defaultValue={item.name}
              required
              pattern=".*\S.*"
              maxLength={120}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${id}-category`}>Category</Label>
              <Select
                name="category"
                value={category}
                onValueChange={(value) => setCategory(value ?? "")}
                required
              >
                <SelectTrigger id={`${id}-category`} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {menuCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-price`}>Price (BDT)</Label>
              <Input
                id={`${id}-price`}
                name="price"
                type="number"
                inputMode="decimal"
                defaultValue={item.price}
                min="0.01"
                step="0.01"
                required
                onKeyDown={(event) => {
                  if (["e", "E", "+", "-"].includes(event.key))
                    event.preventDefault()
                }}
                onPaste={(event) => {
                  if (
                    !/^\d+(\.\d+)?$/.test(event.clipboardData.getData("text"))
                  )
                    event.preventDefault()
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-description`}>Description</Label>
            <Textarea
              id={`${id}-description`}
              name="description"
              defaultValue={item.description}
              required
              rows={4}
              maxLength={1500}
              onChange={(event) =>
                event.currentTarget.setCustomValidity(
                  event.currentTarget.value.trim()
                    ? ""
                    : "Please enter a description."
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-location`}>Location</Label>
            <Input
              id={`${id}-location`}
              name="location"
              defaultValue={item.location}
              required
              pattern=".*\S.*"
              maxLength={150}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-image`}>Replace image</Label>
            <Image
              src={item.image}
              alt={item.name}
              width={96}
              height={96}
              unoptimized
              className="size-24 rounded-lg object-cover"
            />
            <Input
              id={`${id}-image`}
              name="image"
              type="file"
              accept="image/*"
              aria-describedby={`${id}-image-help`}
            />
            <p
              id={`${id}-image-help`}
              className="text-sm text-muted-foreground"
            >
              Leave empty to keep the current image.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`${id}-status`}>Status (read-only)</Label>
              <Input
                id={`${id}-status`}
                value={item.status}
                readOnly
                className="bg-muted capitalize"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              className="bg-brand-700 text-white hover:bg-brand-800"
            >
              {uploading
                ? "Uploading image…"
                : loading
                  ? "Updating…"
                  : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
