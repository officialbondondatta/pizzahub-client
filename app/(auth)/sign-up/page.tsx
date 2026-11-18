"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff, ShoppingBag, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import pizzaImage from "@/app/assets/signup-pizza.png"
import logo from "@/app/assets/pizzahublogo.svg"
import { authClient } from "@/app/lib/auth-client";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const roles = [
    {
        value: "customer",
        label: "Customer",
        description: "Find your next favorite",
        icon: UserRound,
    },
    {
        value: "vendor",
        label: "Vendor",
        description: "Share your menu",
        icon: ShoppingBag,
    },
]
const inputClass =
    "h-11 border-[#e6dbcf] bg-white placeholder:text-[#8b7e73] dark:bg-white"

export default function SignUpPage() {
    const [role, setRole] = useState("customer")
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const handleGoogleSignUp = async () => {
        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}`,
            });
            if (error) {
                toast.add({
                    title: "Google sign-up failed",
                    description: error.message,
                    type: "error",
                });
            }
        } catch (error) {
            toast.add({
                title: "Google sign-up failed",
                description:
                    error instanceof Error
                        ? error.message
                        : "An unexpected error occurred. Please try again.",
                type: "error",
            });
        }
    };
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const form = event.currentTarget
        const formData = new FormData(form)

        const { data, error } = await authClient.signUp.email({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: role === "vendor" ? "vendor" : "customer",
            callbackURL: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}`,
        });
        if (data?.token) {
            router.push("/")
            form.reset()
        }
        toast.add({
            title: error ? "Sign-up failed" : "Sign-up successful",
            description: error ? error.message : "Please check your email for verification.",
            type: error ? "error" : "success",
        });
    }

    return (
        <div className="grid min-h-svh bg-[#fff8ef] text-[#2b2521] lg:grid-cols-[42%_58%]">
            <aside className="relative isolate flex min-h-145 flex-col overflow-hidden bg-[#27231f] px-7 py-8 text-[#fff8ef] sm:min-h-160 sm:px-12 lg:min-h-svh lg:py-10">
                <Image
                    src={pizzaImage}
                    alt="A Bangladeshi woman in a burgundy party dress enjoying pizza"
                    fill
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    className="-z-20 object-cover object-[center_25%]"
                    loading="eager"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(20,14,10,0.55)_0%,rgba(20,14,10,0.05)_35%,rgba(20,14,10,0.75)_65%,rgba(20,14,10,0.95)_100%)]"
                />
                <Link
                    href="/"
                    className="flex w-fit items-center gap-2.5 font-serif text-3xl font-bold"
                >
                    <Image src={logo} alt="" width={520} height={140} style={{ width: 36, height: "auto" }} />
                    PizzaHub
                </Link>
                <div className="mt-auto pt-48 sm:pt-56">
                    <span className="rounded-full bg-[#fff0c9] px-3 py-1 text-[10px] font-semibold tracking-wide text-[#80520d]">
                        A SEAT AT THE TABLE
                    </span>
                    <h2 className="mt-5 max-w-sm font-serif text-4xl leading-[1.08] font-bold xl:text-5xl">
                        Your next favorite starts here.
                    </h2>
                    <p className="mt-5 text-sm leading-6 text-[#f0e4d6]">
                        A neighborhood of great kitchens.
                        <br />
                        One delicious place to find them.
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
                    <h1 className="mt-6 font-serif text-4xl font-bold">
                        Create your account
                    </h1>
                    <p className="mt-2 text-sm text-[#7d7268]">
                        Your next pizza night is just around the corner.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                        <fieldset>
                            <legend className="mb-2 text-sm font-semibold">
                                I’m joining as a
                            </legend>
                            <div className="grid grid-cols-2 gap-3">
                                {roles.map(({ value, label, description, icon: Icon }) => (
                                    <label key={value} className="relative cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value={value}
                                            checked={role === value}
                                            onChange={() => setRole(value)}
                                            className="peer sr-only"
                                        />
                                        <span className="flex h-full items-start gap-2.5 rounded-lg border border-[#e6dbcf] bg-white p-3.5 peer-checked:border-[#e64b37] peer-checked:bg-[#fce8e2] peer-checked:text-[#cf3220] peer-focus-visible:ring-2 peer-focus-visible:ring-[#cf3220] peer-focus-visible:ring-offset-2">
                                            <Icon className="mt-0.5 size-4 shrink-0" />
                                            <span>
                                                <span className="block text-xs font-semibold">
                                                    {label}
                                                </span>
                                                <span className="mt-1 block text-[10px] text-[#7d7268]">
                                                    {description}
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </fieldset>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleSignUp}
                            className="h-11 w-full border-[#e6dbcf] bg-white text-[#2b2521] hover:bg-[#f9eee2] dark:border-[#e6dbcf] dark:bg-white dark:hover:bg-[#f9eee2]"
                        >
                            Continue with Google
                        </Button>
                        <div className="flex items-center gap-5 text-xs text-[#8b7e73]">
                            <span className="h-px flex-1 bg-[#e6dbcf]" />
                            or
                            <span className="h-px flex-1 bg-[#e6dbcf]" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full name</Label>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="name"
                                placeholder="Your full name"
                                required
                                className={inputClass}
                            />
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
                                    autoComplete="new-password"
                                    placeholder="Create a password"
                                    required
                                    minLength={6}
                                    pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                    aria-describedby="password-hint"
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
                            <p id="password-hint" className="text-[11px] text-[#7d7268]">
                                6+ characters · 1 uppercase · 1 lowercase letter
                            </p>
                        </div>
                        <Button
                            type="submit"
                            className="mt-2 h-11 w-full bg-[#cc3222] text-white hover:bg-[#b52a1c]"
                        >
                            Create account
                        </Button>
                        <p className="pt-1 text-center text-sm text-[#cc3222]">
                            Already have an account?{" "}
                            <Link href="/sign-in" className="font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    )
}
