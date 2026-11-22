"use client"

import { useState } from "react"
import { Pizza, Search } from "lucide-react"
import type { IMenuItem } from "@/app/Types/menu-items"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Empty, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AdminMenuTable from "./AdminMenuTable"
import { menuCategories as categories } from "@/app/lib/menu-categories"
import { IUser } from "@/app/Types/user";

export default function ManageMenuItems({ items, users }: { items: IMenuItem[], users: IUser[] }) {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [location, setLocation] = useState("")
  const locations = [...new Set(items.map((item) => item.location))].sort()
  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase()) &&
      (!category || item.category === category) &&
      (!location || item.location === location)
  )

  function resetFilters() {
    setSearch("")
    setCategory("")
    setLocation("")
  }

  return (
    <section className="mt-8" aria-label="Menu items">
      <div className="grid gap-4 rounded-2xl border bg-card p-5 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_auto] lg:items-end">
        <div>
          <Label
            htmlFor="menu-search"
            className="mb-2 block text-sm font-medium"
          >
            Search by name
          </Label>
          <div className="relative">
            <Search
              className="absolute top-3 left-3 size-5 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              id="menu-search"
              type="search"
              placeholder="Search menu items…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-11 bg-background pl-10"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="location" className="mb-2 block text-sm font-medium">
            Location
          </Label>
          <Select
            value={location}
            onValueChange={(value) => setLocation(value ?? "")}
          >
            <SelectTrigger
              id="location"
              className="w-full bg-background data-[size=default]:h-11"
            >
              <SelectValue>{location || "All locations"}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All locations</SelectItem>
              {locations.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="h-11" onClick={resetFilters}>
          Reset filters
        </Button>
      </div>
      <div className="mt-6" role="group" aria-label="Filter by category">
        <p className="mb-3 text-sm font-medium">Categories</p>
        {categories.length ? (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={category === "" ? "default" : "outline"}
              aria-pressed={category === ""}
              onClick={() => setCategory("")}
              className="h-auto min-h-11 rounded-full px-5 py-2 text-left whitespace-normal"
            >
              All
            </Button>
            {categories.map((option) => (
              <Button
                key={option}
                variant={category === option ? "default" : "outline"}
                aria-pressed={category === option}
                onClick={() => setCategory(category === option ? "" : option)}
                className="h-auto min-h-11 rounded-full px-5 py-2 text-left whitespace-normal"
              >
                {option}
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No categories available.
          </p>
        )}
      </div>
      <p className="my-6 text-sm text-muted-foreground" role="status">
        {filtered.length} {filtered.length === 1 ? "item" : "items"} found
      </p>
      {filtered.length ? (
        <AdminMenuTable items={filtered} users={users} />
      ) : (
        <Empty className="rounded-2xl border px-6 py-16">
          <Pizza
            className="mx-auto mb-4 size-10 text-muted-foreground"
            aria-hidden="true"
          />
          <EmptyTitle className="text-xl font-semibold">
            {items.length ? "No matching bites" : "The menu is on its way"}
          </EmptyTitle>
          <EmptyDescription className="mt-2 text-muted-foreground">
            {items.length
              ? "Try another name, category, or location."
              : "Check back soon for something delicious."}
          </EmptyDescription>
          {items.length > 0 && (
            <Button
              variant="outline"
              className="mt-5 h-10"
              onClick={resetFilters}
            >
              Clear filters
            </Button>
          )}
        </Empty>
      )}
    </section>
  )
}
