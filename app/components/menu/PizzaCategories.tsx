import Link from "next/link"
import {
  Pizza,
  Leaf,
  Beef,
  Sparkles,
  Utensils,
  IceCreamBowl,
} from "lucide-react"
import { menuCategories } from "@/app/lib/menu-categories"

const categoryDetails = [
  { icon: Pizza, description: "Timeless flavors, fresh from the oven." },
  { icon: Leaf, description: "Colorful vegetables in every slice." },
  { icon: Beef, description: "Hearty toppings for bigger cravings." },
  { icon: Sparkles, description: "Discover something a little different." },
  { icon: Utensils, description: "The perfect extras to share." },
  { icon: IceCreamBowl, description: "Cool sips and sweet finishes." },
]

export default function PizzaCategories() {
  return (
    <section
      aria-labelledby="pizza-categories-title"
      className="border-y border-brand-200 bg-brand-100/40 dark:border-brand-800 dark:bg-brand-900/20"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <p className="mb-3 text-sm font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
          Something for every craving
        </p>
        <h2
          id="pizza-categories-title"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Pizza Categories
        </h2>
        <p className="mt-3 text-muted-foreground">
          Pick a category and explore what’s cooking.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menuCategories.map((category, index) => {
            const { icon: Icon, description } = categoryDetails[index]
            return (
              <Link
                key={category}
                href={`/browse-menu?category=${encodeURIComponent(category)}`}
                className="group flex cursor-pointer items-start gap-4 rounded-2xl border border-brand-200 bg-card p-6 transition-colors hover:border-brand-500 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 dark:border-brand-800 dark:hover:bg-brand-900"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700 dark:text-brand-300">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {description}
                  </p>
                  <span className="mt-3 block text-sm font-medium text-brand-700 group-hover:underline dark:text-brand-300">
                    Explore menu
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
