import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Mail, Pizza } from "lucide-react"
import logo from "@/app/assets/pizzahublogo.svg"

type SocialIconProps = { className?: string }

function Instagram({ className }: SocialIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    )
}

function Facebook({ className }: SocialIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            aria-hidden="true"
        >
            <path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.4 1.2 16.2 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9h4Z" />
        </svg>
    )
}

function Youtube({ className }: SocialIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className={className}
            aria-hidden="true"
        >
            <rect x="2" y="5" width="20" height="14" rx="4" />
            <path d="m10 9 5 3-5 3Z" fill="currentColor" stroke="none" />
        </svg>
    )
}

// Replace these PizzaHub placeholders with verified business profiles before launch.
const contact = {
    email: "hello@pizzahub.com",
    socials: [
        {
            label: "Instagram",
            href: "/",
            icon: Instagram,
        },
        {
            label: "Facebook",
            href: "/",
            icon: Facebook,
        },
        {
            label: "YouTube",
            href: "/",
            icon: Youtube,
        },
    ],
}

const focus =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-300"
const linkStyle = `${focus} w-fit rounded-sm text-sm text-brand-100/75 transition-colors hover:text-brand-300 motion-reduce:transition-none`

export default function Footer() {
    const year = new Intl.DateTimeFormat("en", {
        year: "numeric",
        timeZone: "Asia/Dhaka",
    }).format(new Date())

    return (
        <footer className="relative isolate overflow-hidden border-t border-brand-800 bg-brand-950 text-brand-50">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-40 -right-32 -z-10 size-96 rounded-full bg-brand-600/10 blur-3xl"
            />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col gap-7 border-b border-brand-100/15 py-10 sm:py-12 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-brand-300 uppercase">
                            <Pizza className="size-4" aria-hidden="true" />
                            There’s always room for one more
                        </p>
                        <h2 className="max-w-lg font-serif text-3xl leading-tight font-semibold sm:text-4xl">
                            Good pizza.{" "}
                            <span className="text-brand-300">Better together.</span>
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-brand-100/70">
                            Find your next favorite. Share a slice. Make a night of it.
                        </p>
                    </div>
                    <Link
                        href="/sign-up"
                        className={`${focus} group inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-6 rounded-full bg-brand-300 px-6 py-3 text-sm font-semibold text-brand-950 transition-colors hover:bg-brand-200`}
                    >
                        Join the PizzaHub table
                        <ArrowUpRight
                            className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                            aria-hidden="true"
                        />
                    </Link>
                </div>

                <div className="grid gap-x-10 gap-y-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1.2fr] lg:py-14">
                    <div>
                        <Link
                            href="/"
                            aria-label="PizzaHub home"
                            className={`${focus} inline-flex rounded-xl bg-brand-100 px-3 py-2`}
                        >
                            <Image
                                src={logo}
                                alt="PizzaHub"
                                width={168}
                                height={45}
                                className="h-auto w-42"
                            />
                        </Link>
                        <p className="mt-5 max-w-xs text-sm leading-7 text-brand-100/75">
                            Your neighborhood of great kitchens, pizza lovers, and moments
                            worth sharing. A little closer to your next favorite slice.
                        </p>
                        <div className="mt-6 flex gap-3" aria-label="PizzaHub social links">
                            {contact.socials.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`PizzaHub on ${label} (opens in a new tab)`}
                                    className={`${focus} flex size-11 items-center justify-center rounded-full border border-brand-100/20 bg-brand-100/5 text-brand-100 transition-colors hover:border-brand-300 hover:bg-brand-300 hover:text-brand-950`}
                                >
                                    <Icon className="size-4.5" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <nav aria-label="Footer explore navigation">
                        <h3 className="mb-5 text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
                            Explore
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className={linkStyle}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/sign-up" className={linkStyle}>
                                    Join PizzaHub
                                </Link>
                            </li>
                            <li>
                                <Link href="/sign-up" className={linkStyle}>
                                    Become a vendor
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <nav aria-label="Footer account navigation">
                        <h3 className="mb-5 text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
                            Your corner
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/sign-in" className={linkStyle}>
                                    Sign in
                                </Link>
                            </li>
                            <li>
                                <Link href="/sign-up" className={linkStyle}>
                                    Sign up
                                </Link>
                            </li>
                            <li>
                                <a href={`mailto:${contact.email}`} className={linkStyle}>
                                    Get in touch
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div>
                        <h3 className="mb-5 text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
                            Let’s talk pizza
                        </h3>
                        <p className="max-w-xs text-sm leading-6 text-brand-100/75">
                            A question, a kitchen to share, or just a hello? We’d love to hear
                            from you.
                        </p>
                        <a
                            href={`mailto:${contact.email}`}
                            className={`${focus} group mt-5 flex w-fit items-center gap-3 rounded-sm text-sm font-medium text-brand-50 hover:text-brand-300`}
                        >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-100/10">
                                <Mail className="size-4" aria-hidden="true" />
                            </span>
                            <span className="break-all">{contact.email}</span>
                            <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
                        </a>
                        <p className="mt-4 text-xs text-brand-100/55">
                            Find us on social · @pizzahub
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-brand-100/15 py-6 text-xs text-brand-100/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {year} PizzaHub. All rights reserved.</p>
                    <p>
                        Developed by <span className="font-medium text-brand-300">Bondon Datta</span>
                    </p>
                    <p className="flex items-center gap-2">
                        <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-brand-300"
                        />
                        Made for the love of pizza.
                    </p>
                </div>
            </div>
        </footer>
    )
}
