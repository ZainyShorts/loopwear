"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  Pagination,
  Paper,
} from "@mui/material"
import {
  Notifications as NotificationsIcon,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
  Refresh,
  ShoppingCart,
  Info,
} from "@mui/icons-material"
import { getBaseUrl } from "@/api/vars/vars"
import { useRouter } from "next/navigation"
import { getAllBusiness } from "@/api/business"

// Types
interface Notification {
  id: number
  business_id: string
  title: string
  type: string
  created_at: number
}

interface NotificationApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: Notification[]
}

interface NotificationFilters {
  page: number
  limit: number
}

// API Helper Functions
const getAuthHeaders = () => {
  const token = localStorage.getItem("auth_token")
  return {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  }
}

const fetchNotifications = async (
  businessId: string,
  filters: NotificationFilters,
): Promise<NotificationApiResponse> => {
  try {
    const token = localStorage.getItem("auth_token")

    if (!token) {
      window.location.href = "/en/login"
      throw new Error("No authentication token. Redirecting to login.")
    }

    const params = new URLSearchParams()
    params.append("limit", filters.limit.toString())
    params.append("page", filters.page.toString())

    const response = await fetch(`${getBaseUrl()}notifications/get_business_notifications/${businessId}/?${params}`, {
      method: "GET",
      headers: getAuthHeaders(),
    })

    if (response.status === 401) {
      localStorage.removeItem("auth_token")
      window.location.href = "/en/login"
      throw new Error("Session ended. Please login again.")
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching notifications:", error)
    throw error
  }
}

export default function NotificationsPage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const router = useRouter()

  // State Management
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiResponse, setApiResponse] = useState<NotificationApiResponse | null>(null)
  const [businessId, setBusinessId] = useState<string>("")
  const [timeZone, setTimeZone] = useState<string>("Asia/Karachi")

  const [filters, setFilters] = useState<NotificationFilters>({
    page: 1,
    limit: 10,
  })

  async function getAllBusinessFunc(){

      try {
          const data: any = await getAllBusiness()
          if(data.data.results[0]){
              setBusinessId(data.data.results[0].business_id)
              setTimeZone(data.data.results[0].timezone)
          }
      } catch (err: any) {
          console.error("Error fetching business data:", err)
      }
  }


  // Effect: Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (!token) {
      router.push("/en/login")
      return
    }
    
    // Get business ID 
    getAllBusinessFunc()
  }, [router])



  // Effect: Load notifications when businessId or filters change
  useEffect(() => {
    if (businessId) {
      loadNotifications()
    }
  }, [businessId, filters])

  const loadNotifications = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetchNotifications(businessId, filters)
      console.log('response',response)
      setApiResponse(response)
      setNotifications(response.results)
    } catch (err: any) {
      setError(err.message || "Failed to load notifications. Please try again.")
      console.error("Error loading notifications:", err)
    } finally {
      setLoading(false)
    }
  }

  // Handlers
  const handleLimitChange = (event: any) => {
    const newLimit = event.target.value
    setFilters((prev) => ({
      ...prev,
      limit: newLimit,
      page: 1, // Reset to first page when changing limit
    }))
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setFilters((prev) => ({
      ...prev,
      page: value,
    }))
  }

  const handleRefresh = () => {
    loadNotifications()
  }

  // Helper function to get notification type icon and color
  const getNotificationTypeDetails = (type: string) => {
    switch (type.toLowerCase()) {
      case "abandoned-checkout":
        return {
          icon: <ShoppingCart />,
          color: "warning" as const,
          label: "Abandoned Checkout",
        }
      case "order-confirmation":
        return {
          icon: <CheckCircle />,
          color: "success" as const,
          label: "Order Confirmation",
        }
      case "payment-reminder":
        return {
          icon: <Warning />,
          color: "info" as const,
          label: "Payment Reminder",
        }
      case "delivery-update":
        return {
          icon: <Info />,
          color: "info" as const,
          label: "Delivery Update",
        }
      case "error":
        return {
          icon: <ErrorIcon />,
          color: "error" as const,
          label: "Error",
        }
      default:
        return {
          icon: <NotificationsIcon />,
          color: "default" as const,
          label: type,
        }
    }
  }

  // Format timestamp
  const formatTime = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000); // convert seconds to milliseconds
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",   // Thu
    year: "numeric",    // 2025
    month: "short",     // Dec
    day: "numeric",     // 5
    hour: "numeric",    // 7
    minute: "2-digit",  // 43
    hour12: true,       // 12-hour format
    timeZone: timeZone, // user-selected timezone
  }).format(date);
};


  // Calculate total pages
  const totalPages = apiResponse ? Math.ceil(apiResponse.count / filters.limit) : 1

  if (!businessId) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        p: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant={isMobile ? "h5" : "h4"} component="h1" color="primary" fontWeight="bold">
                Notifications
              </Typography>
            }
            subheader={
              <Typography variant="h6" color="text.secondary">
                View all notifications and updates for your business
              </Typography>
            }
            action={
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                {/* Records Per Page Selector */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select value={filters.limit} onChange={handleLimitChange} label="Records per page">
                    <MenuItem value={10}>10 per page</MenuItem>
                    <MenuItem value={20}>20 per page</MenuItem>
                    <MenuItem value={30}>30 per page</MenuItem>
                  </Select>
                </FormControl>

                {/* Refresh Button */}
                <Box
                  component="button"
                  onClick={handleRefresh}
                  disabled={loading}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    "&:disabled": {
                      opacity: 0.5,
                      cursor: "not-allowed",
                    },
                  }}
                >
                  <Refresh
                    sx={{
                      animation: loading ? "spin 1s linear infinite" : "none",
                      "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    }}
                  />
                </Box>
              </Box>
            }
          />
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        

        {/* Loading State */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* Notifications Table */}
        {!loading && notifications.length > 0 && (
          <Card sx={{ mb: 3 }}>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "action.hover" }}>
                    <TableCell>
                      <Typography fontWeight="bold">Type</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">Title</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight="bold">Date & Time</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notifications.map((notification) => {
                    const typeDetails = getNotificationTypeDetails(notification.type)
                    return (
                      <TableRow
                        key={notification.id}
                        sx={{
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
                        }}
                      >
                        <TableCell>
                          <Chip
                            icon={typeDetails.icon}
                            label={typeDetails.label}
                            color={typeDetails.color}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{notification.title}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {formatTime(notification.created_at)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}

        {/* Empty State */}
        {!loading && notifications.length === 0 && !error && (
          <Card>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "400px",
              }}
            >
              <NotificationsIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" textAlign="center">
                No notifications found
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                You&apos;re all caught up! Check back later for new notifications.
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <Pagination
              count={totalPages}
              page={filters.page}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              disabled={loading}
            />
          </Box>
        )}
      </Container>
    </Box>
  )
}
