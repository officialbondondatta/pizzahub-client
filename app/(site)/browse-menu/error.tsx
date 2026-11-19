"use client"

import { Button } from "@/components/ui/button"

export default function MenuError({ reset }: { reset: () => void }) {
  return (
    <div className="px-6 py-20 text-center">
      <h2 className="text-2xl font-bold">Could not load the menu</h2>
      <p className="mt-3 text-muted-foreground">
        Please try again in a moment.
      </p>
      <Button onClick={reset} className="mt-6 h-11">
        Try again
      </Button>
    </div>
  )
}
