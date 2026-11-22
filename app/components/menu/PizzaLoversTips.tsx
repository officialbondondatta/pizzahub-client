import Image from "next/image"
import Link from "next/link"
import { Leaf, Users, GlassWater } from "lucide-react"

const tips = [
  {
    icon: Leaf,
    title: "Mix up your toppings",
    description:
      "Pair a familiar classic with a vegetable-packed pizza or a gourmet flavor. A little variety gives everyone something new to try.",
    category: "Specialty / Gourmet Pizzas",
    link: "Explore gourmet pizzas",
  },
  {
    icon: Users,
    title: "Build a spread to share",
    description:
      "Ask your group what they enjoy, then mix a few pizza styles with sides for the table. Check item descriptions before choosing.",
    category: "Sides & Appetizers",
    link: "Find something on the side",
  },
  {
    icon: GlassWater,
    title: "Give your meal a finish",
    description:
      "Add a refreshing drink alongside a rich pizza, or save room for a shared dessert. Make the whole meal part of the occasion.",
    category: "Beverages & Desserts",
    link: "Discover drinks and desserts",
  },
]

export default function PizzaLoversTips() {
  return (
    <section
      aria-labelledby="pizza-tips-title"
      className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-3/2 overflow-hidden rounded-3xl bg-brand-100">
          <Image
            src="/images/pizza-lovers-tips.png"
            alt="Two adult women in summer dresses adding basil and sharing pizza at a pizzeria table."
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            Make every slice an occasion
          </p>
          <h2
            id="pizza-tips-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Pizza Lovers’ Tips
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Your favorite pizza is only the beginning. Try a new combination,
            put together a spread, and make your next pizza night your own.
          </p>
          <p className="mt-5 font-serif text-2xl text-brand-700 dark:text-brand-300">
            A little variety. A table full of favorites.
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tips.map(({ icon: Icon, title, description, category, link }) => (
          <article
            key={title}
            className="flex flex-col rounded-2xl border border-brand-200 bg-card p-6 dark:border-brand-800"
          >
            <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700 dark:text-brand-300">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-3 mb-5 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
            <Link
              href={`/browse-menu?category=${encodeURIComponent(category)}`}
              className="mt-auto inline-flex min-h-11 cursor-pointer items-center rounded-md text-sm font-semibold text-brand-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 dark:text-brand-300"
            >
              {link}
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
