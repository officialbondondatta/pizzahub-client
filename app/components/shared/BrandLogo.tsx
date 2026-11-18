import { cn } from "@/lib/utils"

export default function BrandLogo({
  className,
  inverse = false,
}: {
  className?: string
  inverse?: boolean
}) {
  return (
    <span
      role="img"
      aria-label="PizzaHub"
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap",
        className
      )}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        className="size-10 shrink-0"
      >
        <path
          d="M8 13C18 6 31 6 41 13L25 43C24.5 44 23 44 22.5 43Z"
          fill="#ED7A28"
        />
        <path d="M10 16C19 10 30 10 39 16L24 40Z" fill="#FFD0A0" />
        <path
          d="M7 12C17 5 32 5 42 12"
          stroke="#C75A16"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="20" cy="20" r="3.5" fill="#C93624" />
        <circle cx="29" cy="25" r="3" fill="#C93624" />
        <circle cx="23" cy="33" r="2" fill="#C93624" />
        <path
          d="m29 16 3-1M17 27l2 1"
          stroke="#537443"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span
        aria-hidden="true"
        className={cn(
          "text-[30px] leading-none font-black tracking-[-0.075em] italic sm:text-[32px]",
          inverse ? "text-brand-50" : "text-brand-950 dark:text-brand-50"
        )}
      >
        Pizza
        <span
          className={
            inverse ? "text-brand-300" : "text-brand-600 dark:text-brand-300"
          }
        >
          Hub
        </span>
        <span className="ml-0.5 inline-block size-1.5 rounded-full bg-brand-500" />
      </span>
    </span>
  )
}
