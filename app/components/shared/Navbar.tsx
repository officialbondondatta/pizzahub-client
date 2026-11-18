"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import pizzahublogo from "../../assets/pizzahublogo.svg"
import { authClient, useSession } from "@/app/lib/auth-client";
import { toast } from "@/components/ui/toast";


const focusStyles =
    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"

const Navbar = () => {
    const pathname = usePathname()
    const { resolvedTheme, setTheme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const headerRef = useRef<HTMLElement>(null)
    const toggleRef = useRef<HTMLButtonElement>(null)
    const { data: session } = useSession()
    const user = session?.user

    const navigation = [
        { label: "Home", href: "/" },
        { label: "Browse menu", href: "/menu" },
        { label: "Dashboard", href: `/dashboard/${user?.role}` }
    ]

    const handleSignOut = async () => {
        const { data, error } = await authClient.signOut()
        console.log("Sign-out successful", { data, error })
        toast.add({
            title: error ? "Sign-out failed" : "Sign-out successful",
            description: error ? error.message : "You have successfully signed out.",
            type: error ? "error" : "success",
        })
    }
    useEffect(() => {
        if (!isOpen) return

        const dismissOnOutsideClick = (event: PointerEvent) => {
            if (!headerRef.current?.contains(event.target as Node)) setIsOpen(false)
        }
        const dismissOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false)
                toggleRef.current?.focus()
            }
        }
        const desktop = window.matchMedia("(min-width: 1024px)")
        const dismissOnDesktop = () => {
            if (desktop.matches) setIsOpen(false)
        }

        document.addEventListener("pointerdown", dismissOnOutsideClick)
        document.addEventListener("keydown", dismissOnEscape)
        desktop.addEventListener("change", dismissOnDesktop)
        return () => {
            document.removeEventListener("pointerdown", dismissOnOutsideClick)
            document.removeEventListener("keydown", dismissOnEscape)
            desktop.removeEventListener("change", dismissOnDesktop)
        }
    }, [isOpen])

    const renderLinks = (mobile = false) =>
        navigation.map(({ label, href }) => {
            const active =
                href === "/"
                    ? pathname === href
                    : pathname === href || pathname.startsWith(`${href}/`)
            return (
                <NavigationMenuItem
                    key={href}
                    className={mobile ? "w-full" : undefined}
                >
                    <NavigationMenuLink
                        render={<Link href={href} />}
                        active={active}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                        className={`${focusStyles} rounded-sm px-4 py-3 text-sm font-semibold transition-colors motion-reduce:transition-none ${mobile ? "block" : "inline-flex"} ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`}
                    >
                        {label}
                    </NavigationMenuLink>
                </NavigationMenuItem>
            )
        })

    const renderAuth = () => (
        <>
            <Button
                nativeButton={false}
                render={<Link href="/sign-in" />}
                variant="outline"
                onClick={() => setIsOpen(false)}
                className={`${focusStyles} h-11 rounded-sm border border-border px-5 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-accent motion-reduce:transition-none`}
            >
                Sign in
            </Button>
            <Button
                nativeButton={false}
                render={<Link href="/sign-up" />}
                onClick={() => setIsOpen(false)}
                className={`${focusStyles} h-11 rounded-sm border border-transparent bg-primary px-5 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 motion-reduce:transition-none`}
            >
                Sign up
            </Button>
        </>
    )
    const afterLoginRenderAuth = () => (
        <>
            <Button
                variant="outline"
                onClick={handleSignOut}
                className={`${focusStyles} h-11 rounded-sm border border-border px-5 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:border-primary hover:bg-accent motion-reduce:transition-none`}
            >
                Sign Out
            </Button>
        </>
    )

    const themeToggle = (
        <Button
            variant="secondary"
            size="icon"
            type="button"
            aria-label="Toggle light or dark theme"
            title="Toggle light or dark theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className={`${focusStyles} flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-foreground transition-colors hover:bg-accent`}
        >
            <Moon size={20} aria-hidden="true" className="dark:hidden" />
            <Sun size={20} aria-hidden="true" className="hidden dark:block" />
        </Button>
    )

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <header
                ref={headerRef}
                className="relative z-40 border-b border-border bg-card"
            >
                <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
                    <Link
                        href="/"
                        aria-label="PizzaHub home"
                        onClick={() => setIsOpen(false)}
                        className={`${focusStyles} block w-36 max-w-full min-w-0 shrink rounded-sm  bg-orange-100 sm:w-40 lg:justify-self-start`}
                    >
                        <Image
                            src={pizzahublogo}
                            alt="PizzaHub"
                            width={160}
                            height={43}
                            className="block h-auto max-h-11 w-full object-contain"
                            style={{ height: "auto" }}
                            loading="eager"
                        />
                    </Link>

                    <NavigationMenu
                        aria-label="Main navigation"
                        className="hidden lg:flex"
                    >
                        <NavigationMenuList className="gap-2">
                            {renderLinks()}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="hidden items-center justify-end gap-3 lg:flex">
                        {
                            user ? afterLoginRenderAuth() : renderAuth()
                        }
                        {themeToggle}
                    </div>

                    <div className="flex shrink-0 items-center gap-2 lg:hidden">
                        {themeToggle}
                        <CollapsibleTrigger
                            render={<Button variant="outline" size="icon" />}
                            ref={toggleRef}
                            type="button"
                            aria-label={isOpen ? "Close navigation" : "Open navigation"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-navigation"
                            className={`${focusStyles} flex size-11 items-center justify-center rounded-xl border border-border text-foreground hover:bg-accent lg:hidden`}
                        >
                            {isOpen ? (
                                <X size={22} aria-hidden="true" />
                            ) : (
                                <Menu size={22} aria-hidden="true" />
                            )}
                        </CollapsibleTrigger>
                    </div>
                </div>

                <CollapsibleContent
                    id="mobile-navigation"
                    className="absolute inset-x-0 top-full border-b border-border bg-card px-4 pb-5 shadow-lg shadow-slate-950/10 lg:hidden"
                >
                    <NavigationMenu
                        aria-label="Mobile navigation"
                        className="max-w-none border-t border-border py-3"
                    >
                        <NavigationMenuList className="w-full flex-col items-stretch gap-1">
                            {renderLinks(true)}
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                        {renderAuth()}
                    </div>
                </CollapsibleContent>
            </header>
        </Collapsible>
    )
}

export default Navbar
