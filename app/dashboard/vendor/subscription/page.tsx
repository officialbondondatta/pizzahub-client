import Image from "next/image"
import { Check, Crown, Pizza, Sparkles } from "lucide-react"
import UpgrateToPremiumButton from "@/app/components/subscription/UpgrateToPremiumButton"
import SwtichToFreeButton from "@/app/components/subscription/SwtichToFreeButton"
import { redirect } from "next/navigation"

const plans = [
  {
    name: "Free",
    description: "The essentials to get your kitchen started.",
    caption: "No subscription fee",
    features: [
      "Up to 3 active menu items",
      "Basic vendor dashboard",
      "Order management",
    ],
  },
  {
    name: "Premium",
    description: "A bigger menu. A brighter spotlight.",
    caption: "Unlock your kitchen's full potential",
    features: [
      "Unlimited active menu items",
      "Premium vendor badge",
      "Featured menu placement",
      "All Free plan features",
    ],
  },
]
type SubscriptionPageProps = {
  searchParams: Promise<{ canceled?: string | string[] }>
}

const SubscriptionPage = async ({ searchParams }: SubscriptionPageProps) => {
  const { canceled } = await searchParams
  if (canceled === "true") {
    redirect("/payment/cancel")
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header>
        <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-brand-700 uppercase dark:text-brand-300">
          Made for your next chapter
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Your subscription</h1>
      </header>

      <section className="grid overflow-hidden rounded-3xl border bg-card lg:grid-cols-2">
        <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-10">
          <span className="mb-5 flex items-center gap-2 text-sm font-medium text-brand-700 dark:text-brand-300">
            <Pizza className="size-5" aria-hidden="true" /> A little more room
            to grow
          </span>
          <h2 className="max-w-md text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            More on your menu.
            <span className="block text-brand-700 dark:text-brand-300">
              More to fall in love with.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
            From your first signature pizza to a menu full of favorites, choose
            the plan that gives your business room to grow.
          </p>
        </div>
        <div className="relative min-h-64 sm:min-h-80">
          <Image
            loading="eager"
            src="/images/subscription-pizzahub.png"
            alt="A middle-aged woman in a terracotta bandeau top ordering PizzaHub on her phone at a sunny café."
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
            preload
          />
        </div>
      </section>

      <section aria-labelledby="plans-heading">
        <div className="mb-5">
          <h2 id="plans-heading" className="text-xl font-semibold">
            Simple plans. Delicious possibilities.
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Start with the essentials or give your menu the spotlight.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {plans.map((plan) => {
            const premium = plan.name === "Premium"
            const Icon = premium ? Crown : Pizza
            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-3xl p-6 sm:p-8 ${premium ? "border-2 border-brand-500 bg-brand-100/50 shadow-lg shadow-brand-900/5 dark:bg-brand-950/40" : "border bg-background"}`}
              >
                {premium && (
                  <span className="absolute top-6 right-6 inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white sm:top-8 sm:right-8">
                    <Sparkles className="size-3.5" aria-hidden="true" /> Room to
                    grow
                  </span>
                )}
                <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-brand-200 text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
                <p className="mt-5 text-sm font-semibold">{plan.caption}</p>
                <ul className="mt-6 flex-1 space-y-4 border-t pt-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check
                        className="size-5 shrink-0 text-brand-700 dark:text-brand-300"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                {premium ? (
                  <UpgrateToPremiumButton></UpgrateToPremiumButton>
                ) : (
                  <SwtichToFreeButton></SwtichToFreeButton>
                )}
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default SubscriptionPage
