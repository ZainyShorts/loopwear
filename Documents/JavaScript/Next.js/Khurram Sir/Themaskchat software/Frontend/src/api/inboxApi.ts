
import { getBaseUrl } from "./vars/vars"

// API service for inbox functionality
const API_BASE_URL = `${getBaseUrl()}inbox`

const getAuthHeaders = () => {
  const auth_token = localStorage.getItem("auth_token")
  return {
    Authorization: `Token ${auth_token}`,
    "Content-Type": "application/json",
  }
}

export interface ApiCustomer {
  id: number
  phone_number: string
  name: string
  business: number
  admin: number
  assigned_to: number | null
}

export interface InboxTeamMember {
  id: number
  user: number
  user_name: string
  user_email: string
}

export interface InboxTeam {
  id: number
  name: string
  platforms: string[]
  assign_all: boolean
  members: InboxTeamMember[]
  assigned_customer_ids: number[]
  created_at: string
}

export interface ApiMessage {
  id: number
  sender: "business" | "user"
  message: string
  timestamp: string
  customer: number
}

export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export const inboxApi = {
  // Get customers list
  getCustomers: async (page = 1, pageSize = 10, search = "", platformFilter = ""): Promise<ApiResponse<ApiCustomer>> => {
    const params = new URLSearchParams({
      page: page.toString(),
      page_size: pageSize.toString(),
    })
    if (search.trim()) params.append("search", search.trim())
    if (platformFilter) params.append("type", platformFilter)

    const response = await fetch(`${API_BASE_URL}/customer/?${params.toString()}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.statusText}`)
    }

    return response.json()
  },

  toggleChatbotReply: async (customerId: number) => {
    const response = await fetch(`${API_BASE_URL}/customer/${customerId}/toggle-chatbot-reply/`, {
      method: "POST",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to update chatbot reply setting: ${response.statusText}`)
    }
    const data = await response.json()
    return data
  },

  // Get messages for a customer
  getMessages: async (customerId: number): Promise<ApiResponse<ApiMessage>> => {
    const response = await fetch(`${API_BASE_URL}/messages?customer_id=${customerId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`)
    }
    const data = await response.json()
    console.log("test", data)
    return data
  },

  // Fetch pre-signed URL for a message file
  getPresignedUrl: async (messageId: number) => {
    const response = await fetch(`${API_BASE_URL}/messages/${messageId}/presigned/`, {
      method: "GET",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch presigned URL: ${response.statusText}`)
    }

    return response.json()
  },

  // Send message to customer
  sendMessage: async (customerId: number, message: string, type = "Text"): Promise<ApiMessage> => {
    const response = await fetch(`${API_BASE_URL}/messages/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        customer: customerId,
        sender: "business",
        message: message,
        type: type,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`)
    }

    return response.json()
  },

  deleteMultipleMessages: async (ids: number[]): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/messages/delete-multiple/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ ids }),
    })

    if (!response.ok) {
      throw new Error(`Failed to delete messages: ${response.statusText}`)
    }
   
    return response.json()
  },

  deleteAllMessages: async (customerId: number): Promise<{ success: boolean; message: string }> => {
    const response = await fetch(`${API_BASE_URL}/messages/delete-all/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ customer_id: customerId }),
    })

    if (!response.ok) {
      throw new Error(`Failed to delete all messages: ${response.statusText}`)
    }

    return response.json()
  },

  // Get customer count for polling
  getCustomerCount: async (): Promise<{ count: number }> => {
    const response = await fetch(`${API_BASE_URL}/customer/count/`, {
      method: "GET",
      headers: getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch customer count: ${response.statusText}`)
    }

    return response.json()
  },

  // Assign a customer directly to a sub-user (or unassign with null)
  assignCustomerToUser: async (customerId: number, userId: number | null): Promise<ApiCustomer> => {
    const response = await fetch(`${API_BASE_URL}/customer/${customerId}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ assigned_to: userId }),
    })
    if (!response.ok) throw new Error('Failed to assign customer')
    return response.json()
  },

  // ─── Inbox Teams ───────────────────────────────────────────
  listTeams: async (): Promise<InboxTeam[]> => {
    const response = await fetch(`${API_BASE_URL}/teams/`, {
      method: 'GET',
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Failed to fetch teams')
    const data = await response.json()
    return data.results ?? data
  },

  createTeam: async (payload: {
    name: string
    platforms: string[]
    assign_all: boolean
    member_ids: number[]
  }): Promise<InboxTeam> => {
    const response = await fetch(`${API_BASE_URL}/teams/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('Failed to create team')
    return response.json()
  },

  updateTeam: async (
    teamId: number,
    payload: { name: string; platforms: string[]; assign_all: boolean; member_ids: number[] },
  ): Promise<InboxTeam> => {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('Failed to update team')
    return response.json()
  },

  deleteTeam: async (teamId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    if (!response.ok) throw new Error('Failed to delete team')
  },

  assignCustomersToTeam: async (teamId: number, customerIds: number[]): Promise<{ success: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/teams/${teamId}/assign-customers/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ customer_ids: customerIds }),
    })
    if (!response.ok) throw new Error('Failed to assign customers')
    return response.json()
  },

  // Validate latest message for polling
  validateLatestMessage: async (
    customerId: number,
    message: string,
  ): Promise<{ match: boolean; latest_message: string }> => {
    const response = await fetch(`${API_BASE_URL}/messages/validate-latest/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        customer_id: customerId,
        message: message,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to validate latest message: ${response.statusText}`)
    }

    return response.json()
  },
}
