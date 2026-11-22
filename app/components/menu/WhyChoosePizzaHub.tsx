import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, MapPin, CalendarDays, ListChecks } from "lucide-react"

const benefits = [
  {
    icon: BadgeCheck,
    title: "A menu worth exploring",
    description:
      "Browse approved, active dishes with clear prices and details before you choose.",
  },
  {
    icon: MapPin,
    title: "Find your local flavor",
    description:
      "Explore vendor kitchens by location and discover the business behind every pizza.",
  },
  {
    icon: CalendarDays,
    title: "Plan your pizza moment",
    description:
      "Request a delivery date, add your address, and leave a note for the vendor.",
  },
  {
    icon: ListChecks,
    title: "Keep your orders in view",
    description:
      "See your requests and their latest status together in your personal dashboard.",
  },
]

export default function WhyChoosePizzaHub() {
  return (
    <section
      aria-labelledby="why-pizzahub-title"
      className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-brand-100 lg:aspect-auto lg:min-h-160">
          <Image
            src="/images/why-choose-pizzahub.png"
            alt="Two young adult women in summer dresses sharing pizza at an outdoor pizzeria."
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-950/90 to-transparent px-7 pt-24 pb-8 text-white">
            <p className="max-w-xs font-serif text-3xl leading-tight">
              Good food.
              <br />
              Better moments together.
            </p>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold tracking-widest text-brand-700 uppercase dark:text-brand-300">
            More than your next slice
          </p>
          <h2
            id="why-pizzahub-title"
            className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl"
          >
            Why Choose PizzaHub?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            From finding a new favorite to planning a night with friends, make
            room for pizza without making things complicated.
          </p>
          <div className="mt-8 grid gap-x-7 gap-y-8 sm:grid-cols-2">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div key={title}>
                <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-700 dark:text-brand-300">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/browse-menu"
            className="mt-9 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full bg-brand-700 px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
          >
            Find your next favorite
          </Link>
        </div>
      </div>
    </section>
  )
}
