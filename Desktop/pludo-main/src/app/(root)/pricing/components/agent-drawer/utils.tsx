import type { Agent } from "./types"

export const calculateTotalPrice = (agents: Agent[], planType: string) => {
  const pricePerAgent = planType === "Plus" ? 14.9 : 20
  return agents.reduce((total) => total + pricePerAgent, 0)
}

export const updateSelectionMessage = (count: number, planType: string) => {
  if (planType === "Plus") {
    if (count < 10) {
      return `Select ${10 - count} more to continue`
    } else if (count === 10) {
      return null
    } else {
      return `${count - 10} remaining agents`
    }
  }
  return null
}

