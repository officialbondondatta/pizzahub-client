"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ErrorPage({ retry }: { retry: () => void }) {
  return (
    <main className="px-6 py-20 text-center">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">
        We could not load this page. Please try again in a moment.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button onClick={retry}>Try again</Button>
        <Link href="/" className="underline">
          Back to home
        </Link>
      </div>
    </main>
  )
}
