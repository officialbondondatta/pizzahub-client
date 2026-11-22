"use client"

import { useEffect, useRef } from "react"
import { toast } from "@/components/ui/toast"

export default function PaymentToast({
  success,
  message,
  title,
}: {
  success: boolean
  title?: string
  message: string
}) {
  const shown = useRef(false)

  useEffect(() => {
    if (shown.current) return
    shown.current = true

    toast.add({
      title: title || (success ? "Payment verified" : "Verification failed"),
      description: message,
      type: success ? "success" : "error",
    })
  }, [success, message, title])

  return null
}
