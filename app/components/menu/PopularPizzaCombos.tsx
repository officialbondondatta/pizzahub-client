import Image from "next/image"
import Link from "next/link"
import { Heart, Leaf, Users } from "lucide-react"

const combos = [
  {
    icon: Heart,
    title: "Pizza night for two",
    description:
      "Keep it classic with a favorite pizza, a side to share, and something refreshing to sip.",
    choices: ["Classic Pizzas", "Sides & Appetizers", "Beverages & Desserts"],
  },
  {
    icon: Leaf,
    title: "A veggie-filled evening",
    description:
      "Build your meal around colorful vegetable toppings, then add a side and a sweet finish.",
    choices: [
      "Vegetarian Pizzas",
      "Sides & Appetizers",
      "Beverages & Desserts",
    ],
  },
  {
    icon: Users,
    title: "The friends’ table",
    description:
      "Mix hearty toppings with a gourmet pick and let everyone find a favorite slice.",
    choices: [
      "Meat Lovers",
      "Specialty / Gourmet Pizzas",
      "Sides & Appetizers",
    ],
  },
]

export default function PopularPizzaCombos() {
  return (
    <section
      aria-labelledby="pizza-combos-title"
      className="border-y border-brand-200 bg-brand-100/40 dark:border-brand-800 dark:bg-brand-900/20"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
              Better together
            </p>
            <h2
              id="pizza-combos-title"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Popular Pizza Combos
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A date night, a catch-up, or a table full of friends—start with a
              pairing idea and make it yours.
            </p>
            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              These are meal ideas to explore. Choose available items from each
              category; prices and availability are listed on the menu.
            </p>
            <Link
              href="/browse-menu"
              className="mt-7 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-brand-700 px-7 py-3 font-semibold text-white hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
            >
              Build your pizza night
            </Link>
          </div>
          <div className="relative aspect-3/2 overflow-hidden rounded-3xl bg-brand-100">
            <Image
              src="/images/popular-pizza-combos.png"
              alt="An adult couple sharing pizza, garlic bread, and citrus drinks on an outdoor pizzeria date."
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {combos.map(({ icon: Icon, title, description, choices }) => (
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
              <ul className="mt-auto space-y-2">
                {choices.map((category) => (
                  <li key={category}>
                    <Link
                      href={`/browse-menu?category=${encodeURIComponent(category)}`}
                      className="flex min-h-11 cursor-pointer items-center rounded-xl border border-brand-200 px-4 py-2 text-sm font-medium text-brand-700 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 dark:border-brand-800 dark:text-brand-300 dark:hover:bg-brand-900"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
