import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import FeaturedMenuItems from "@/app/components/menu/FeaturedMenuItems"
import PizzaCategories from "@/app/components/menu/PizzaCategories"
import WhyChoosePizzaHub from "@/app/components/menu/WhyChoosePizzaHub"
import HowPizzaHubWorks from "@/app/components/menu/HowPizzaHubWorks"
import PizzaLoversTips from "@/app/components/menu/PizzaLoversTips"
import PopularPizzaCombos from "@/app/components/menu/PopularPizzaCombos"
import { Suspense } from "react"
import SectionReveal from "@/app/components/shared/SectionReveal"

export default function HomePage() {
  return (
    <>
      <section
        aria-labelledby="banner-title"
        className="relative isolate flex min-h-160 items-end overflow-hidden bg-brand-950 text-white sm:min-h-170 sm:items-center lg:min-h-180"
      >
        <Image
          src="/images/home-pizza-friends.jpg"
          alt="South Asian friends laughing and sharing fresh pizza at an outdoor pizzeria"
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="-z-20 object-cover object-[65%_center] sm:object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950 via-brand-950/65 to-brand-950/5 sm:bg-gradient-to-r sm:from-brand-950/95 sm:via-brand-950/65 sm:to-transparent"
        />
        <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:py-20 lg:px-8">
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-semibold tracking-[0.24em] text-brand-200 uppercase">
              Big flavors. Your favorite people.
            </p>
            <h1
              id="banner-title"
              className="font-serif text-5xl leading-[1.06] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
            >
              Great pizza.
              <span className="block text-brand-300">Even better company.</span>
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-white/85 sm:text-lg">
              Find your favorite slice from local kitchens. Bring your cravings,
              gather your people, and make it a pizza night.
            </p>
            <Link
              href="/browse-menu"
              className="mt-8 inline-flex min-h-13 items-center justify-center gap-4 rounded-full bg-brand-300 px-7 py-3.5 text-sm font-bold text-brand-950 shadow-lg shadow-black/15 hover:bg-brand-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-200"
            >
              Explore Pizza Menu
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <Suspense
        fallback={
          <p
            role="status"
            className="px-6 py-16 text-center text-muted-foreground"
          >
            Loading featured menu items…
          </p>
        }
      >
        <SectionReveal>
          <FeaturedMenuItems />
        </SectionReveal>
      </Suspense>
      <SectionReveal direction="right">
        <PizzaCategories />
      </SectionReveal>
      <SectionReveal>
        <WhyChoosePizzaHub />
      </SectionReveal>
      <SectionReveal direction="right">
        <HowPizzaHubWorks />
      </SectionReveal>
      <SectionReveal>
        <PizzaLoversTips />
      </SectionReveal>
      <SectionReveal direction="right">
        <PopularPizzaCombos />
      </SectionReveal>
    </>
  )
}
