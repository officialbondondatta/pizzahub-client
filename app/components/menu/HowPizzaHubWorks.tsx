import Image from "next/image"
import Link from "next/link"
import { Search, CalendarDays, ClipboardCheck } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Find your favorite",
    description:
      "Explore pizzas by category, location, or price. Sign in to open an item’s details and get to know the vendor.",
  },
  {
    icon: CalendarDays,
    title: "Make your delivery request",
    description:
      "Choose your pizza, pick a delivery date, and add your address. Leave a message if there’s something the vendor should know.",
  },
  {
    icon: ClipboardCheck,
    title: "Follow your order",
    description:
      "Visit My Orders to see whether the vendor has accepted your request and review your delivery details.",
  },
]

export default function HowPizzaHubWorks() {
  return (
    <section
      aria-labelledby="how-pizzahub-title"
      className="border-y border-brand-200 bg-brand-100/40 dark:border-brand-800 dark:bg-brand-900/20"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
              Your next pizza moment
            </p>
            <h2
              id="how-pizzahub-title"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              How PizzaHub Works
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
              A few simple steps from browsing local kitchens to sending your
              delivery request.
            </p>
            <ol className="mt-8 space-y-7">
              {steps.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-brand-200 bg-card text-brand-700 dark:border-brand-800 dark:text-brand-300">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              href="/browse-menu"
              className="mt-9 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-brand-700 px-7 py-3 font-semibold text-white hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
            >
              Explore the menu
            </Link>
          </div>
          <div className="overflow-hidden rounded-3xl border border-brand-200 bg-card dark:border-brand-800">
            <div className="relative aspect-3/2">
              <Image
                src="/images/how-pizzahub-works.png"
                alt="Two adult women in summer dresses sharing pizza, with one using her phone at a sunny pizzeria."
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="px-6 py-5 sm:px-8">
              <p className="font-serif text-2xl font-medium">
                Less planning. More pizza moments.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose a dish, send a request, and keep everything in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
