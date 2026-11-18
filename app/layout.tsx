import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: {
    default: "PizzaHub | Good Pizza. Better Together.",
    template: "%s | PizzaHub",
  },
  description:
    "Discover your next favorite pizza with PizzaHub. Explore local kitchens, connect with vendors, and share great food with even better company.",
}

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <Toaster position="top-right" />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
