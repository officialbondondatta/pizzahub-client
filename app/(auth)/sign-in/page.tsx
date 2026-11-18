"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { GoogleRoleDialog } from "@/components/google-role-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import pizzaImage from "@/app/assets/signin-family.png"
import BrandLogo from "@/app/components/shared/BrandLogo"
import { authClient } from "@/app/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const inputClass =
    "h-11 border-[#e6dbcf] bg-white placeholder:text-[#8b7e73] dark:bg-white"

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)
        const signInData = Object.fromEntries(formData.entries())
        const email = (signInData.email as string).trim()
        const password = (signInData.password as string)
        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
        });
        if (data?.token) {
            router.push("/")
            form.reset()
        }
        toast.add({
            title: error ? "Sign-in failed" : "Sign-in successful",
            description: error ? error.message : "You have successfully signed in.",
            type: error ? "error" : "success",
        });

    }

    return (
        <div className="grid min-h-svh bg-[#fff8ef] text-[#2b2521] lg:grid-cols-[42%_58%]">
            <aside className="relative isolate flex min-h-145 flex-col overflow-hidden bg-[#27231f] px-7 py-8 text-[#fff8ef] sm:min-h-160 sm:px-12 lg:min-h-svh lg:py-10">
                <Image
                    src={pizzaImage}
                    alt="A Bangladeshi family sharing pizza at a restaurant"
                    fill
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    className="-z-20 object-cover object-[center_25%]"
                    loading="lazy"
                    fetchPriority="high"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,14,10,0.55)_0%,rgba(20,14,10,0.05)_35%,rgba(20,14,10,0.75)_65%,rgba(20,14,10,0.95)_100%)]"
                />
                <Link
                    href="/"
                    className="flex w-fit items-center gap-2.5 font-serif text-3xl font-bold"
                >
                    <BrandLogo inverse />
                </Link>
                <div className="mt-auto pt-48 sm:pt-56">
                    <span className="rounded-full bg-[#fff0c9] px-3 py-1 text-[10px] font-semibold tracking-wide text-[#80520d]">
                        YOUR TABLE IS WAITING
                    </span>
                    <h2 className="mt-5 max-w-sm font-serif text-4xl leading-[1.08] font-bold xl:text-5xl">
                        Good pizza. Better company.
                    </h2>
                    <p className="mt-5 text-sm leading-6 text-[#f0e4d6]">
                        Your favorite kitchens. Your favorite people.
                        <br />
                        Come back for another slice.
                    </p>
                </div>
                <p className="mt-8 text-[9px] tracking-wider text-[#f0e4d6]">
                    GOOD FOOD. GOOD PEOPLE. PIZZAHUB.
                </p>
            </aside>
            <section className="flex items-center justify-center px-6 py-10 sm:px-12 lg:py-14">
                <div className="w-full max-w-md">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs text-[#7d7268] hover:text-[#cc3222]"
                    >
                        <ArrowLeft className="size-3" />
                        Back to home
                    </Link>
                    <h1 className="mt-6 font-serif text-4xl font-bold">Welcome back</h1>
                    <p className="mt-2 text-sm text-[#7d7268]">
                        Sign in for another delicious pizza night.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                        <GoogleRoleDialog />
                        <div className="flex items-center gap-5 text-xs text-[#8b7e73]">
                            <span className="h-px flex-1 bg-[#e6dbcf]" />
                            or
                            <span className="h-px flex-1 bg-[#e6dbcf]" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="you@example.com"
                                required
                                className={inputClass}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    required
                                    className={`${inputClass} pr-12`}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    className="absolute top-1.5 right-1.5 text-[#7d7268] hover:bg-[#f9eee2]"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </Button>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="mt-2 h-11 w-full bg-[#cc3222] text-white hover:bg-[#b52a1c]"
                        >
                            Sign in
                        </Button>
                        <p className="pt-1 text-center text-sm text-[#cc3222]">
                            New to PizzaHub?{" "}
                            <Link href="/sign-up" className="font-medium hover:underline">
                                Create an account
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    )
}
