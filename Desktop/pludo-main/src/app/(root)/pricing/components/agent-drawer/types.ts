import type { AgentData } from "@/app/(root)/agents/[agent]/Components/data"

export interface AgentDrawerProps {
  isOpen: boolean
  onClose: () => void
  planType: string
}

export type Agent = (typeof AgentData)[0]

