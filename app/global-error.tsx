"use client"

import Link from "next/link"

export default function GlobalError({ retry }: { retry: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "sans-serif",
          padding: "4rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h1>Something went wrong</h1>
        <p>PizzaHub could not load. Please try again in a moment.</p>
        <button onClick={retry}>Try again</button>
        <p>
          <Link href="/">Back to home</Link>
        </p>
      </body>
    </html>
  )
}
