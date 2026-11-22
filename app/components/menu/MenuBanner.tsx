import Image from "next/image"
import familyPhoto from "@/app/assets/signin-family.png"

export default function MenuBanner({ vendor = false }: { vendor?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-brand-950 px-6 py-12 text-white sm:px-10 sm:py-16">
      {/* Replace this existing photo with the delivery image when available. */}
      <Image
        src={familyPhoto}
        alt="Family sharing pizza at a restaurant"
        fill
        sizes="(max-width: 1280px) 100vw, 1280px"
        className="-z-20 object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-950 via-brand-950/85 to-brand-950/20" />
      <p className="mb-3 text-sm font-semibold tracking-widest text-brand-200 uppercase">
        {vendor
          ? "Your kitchen, their favorites"
          : "Fresh flavors. Local kitchens."}
      </p>
      <h1 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
        {vendor
          ? "Your menu, all in one place."
          : "Find your next favorite bite."}
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-brand-50">
        {vendor
          ? "Keep an eye on your creations and their review status."
          : "Explore the menu and discover something delicious in your neighborhood."}
      </p>
    </section>
  )
}
