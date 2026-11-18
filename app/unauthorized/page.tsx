import type { Metadata } from "next"
import Link from "next/link"
import {
    ArrowLeft,
    ArrowUpRight,
    LockKeyhole,
    Pizza,
    ShieldCheck,
} from "lucide-react"
import BrandLogo from "@/app/components/shared/BrandLogo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
    title: "Access restricted",
    description:
        "This PizzaHub page requires a different account permission. Return home or sign in with an authorized account.",
    robots: { index: false, follow: false },
}

export default function UnauthorizedPage() {
    return (
        <div className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-48 -right-40 -z-10 size-144 rounded-full bg-primary/20 blur-3xl"
            />
            <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 sm:px-10">
                <Link
                    href="/"
                    aria-label="PizzaHub home"
                    className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                    <BrandLogo />
                </Link>
                <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                    <ShieldCheck className="size-4" aria-hidden="true" />
                    Your account, protected
                </span>
            </header>
            <main className="flex flex-1 items-center justify-center px-5 py-12 sm:py-16">
                <section
                    aria-labelledby="access-title"
                    className="w-full max-w-2xl text-center"
                >
                    <div
                        aria-hidden="true"
                        className="relative mx-auto mb-9 flex h-44 w-64 items-center justify-center sm:h-52 sm:w-80"
                    >
                        <span className="absolute text-[140px] leading-none font-black tracking-tighter text-primary/25 select-none sm:text-[180px]">
                            403
                        </span>
                        <div className="relative mt-9 flex size-24 -rotate-6 items-center justify-center rounded-3xl border border-primary/40 bg-card shadow-xl shadow-brand-950/10 sm:size-28">
                            <LockKeyhole
                                className="size-11 rotate-6 text-brand-700 dark:text-brand-300"
                                strokeWidth={1.5}
                            />
                        </div>
                        <span className="absolute top-5 right-5 flex size-12 rotate-12 items-center justify-center rounded-2xl border border-primary/30 bg-background shadow-sm">
                            <Pizza className="size-6 text-brand-600 dark:text-brand-300" />
                        </span>
                    </div>
                    <span className="inline-flex rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-brand-700 uppercase dark:text-brand-200">
                        Access restricted
                    </span>
                    <h1
                        id="access-title"
                        className="mt-5 font-serif text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl"
                    >
                        This slice is reserved.
                    </h1>
                    <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground">
                        You don’t have permission to view this page. Head back home, or sign
                        in with an account that has access.
                    </p>
                    <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                        <Button
                            nativeButton={false}
                            render={<Link href="/" />}
                            className="h-12 rounded-xl bg-brand-700 px-6 text-white hover:bg-brand-800"
                        >
                            <ArrowLeft aria-hidden="true" />
                            Back to home
                        </Button>
                        <Button
                            nativeButton={false}
                            render={<Link href="/sign-in" />}
                            variant="outline"
                            className="h-12 rounded-xl bg-background px-6"
                        >
                            Go to sign in
                            <ArrowUpRight aria-hidden="true" />
                        </Button>
                    </div>
                    <div className="mx-auto mt-10 max-w-md border-t border-border/70 pt-6">
                        <p className="text-sm text-muted-foreground">
                            Still hungry? There’s plenty to explore.
                        </p>
                        <Link
                            href="/browse-menu"
                            className="mt-2 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-brand-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-brand-300"
                        >
                            Explore the pizza menu
                            <ArrowUpRight className="size-4" aria-hidden="true" />
                        </Link>
                    </div>
                </section>
            </main>
            <footer className="px-6 py-6 text-center text-xs tracking-wide text-muted-foreground">
                Good pizza. Better company. Always PizzaHub.
            </footer>
        </div>
    )
}
