type Subscription = {
  plan?: string | null
  subscriptionExpiresAt?: string | Date | null
}

export function getSubscriptionPlan(user?: Subscription | null) {
  if (user?.plan !== "premium") return "free"
  // Keep legacy subscriptions without an expiry unchanged.
  if (!user.subscriptionExpiresAt) return "premium"
  return new Date(user.subscriptionExpiresAt).getTime() > Date.now()
    ? "premium"
    : "free"
}

export function formatSubscriptionExpiry(value?: string | Date | null) {
  if (!value) return "Not available"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Not available"
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(date) + " (Dhaka time)"
}
