"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"

export default function SectionReveal({
  children,
  direction = "left",
}: {
  children: ReactNode
  direction?: "left" | "right"
}) {
  const reduceMotion = useReducedMotion()
  const offset = direction === "left" ? -80 : 80

  return (
    <div className="overflow-x-clip">
      <motion.div
        initial={false}
        whileInView={
          reduceMotion
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: [0, 1], x: [offset, 0], scale: [0.97, 1] }
        }
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          opacity: { duration: reduceMotion ? 0 : 0.65 },
          x: { type: "spring", duration: reduceMotion ? 0 : 1.1, bounce: 0.18 },
          scale: { duration: reduceMotion ? 0 : 0.9, ease: "easeOut" },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
