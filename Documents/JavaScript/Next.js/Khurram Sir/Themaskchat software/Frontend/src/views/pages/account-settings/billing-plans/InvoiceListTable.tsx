"use client"

import { useState, useEffect, useMemo } from "react"
import { format, parseISO } from "date-fns"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import MenuItem from "@mui/material/MenuItem"
import TablePagination from "@mui/material/TablePagination"
import type { ColumnDef } from "@tanstack/react-table"
import CustomTextField from "@core/components/mui/TextField"
import TablePaginationComponent from "@components/TablePaginationComponent"
import { createColumnHelper, useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table"
import { getBaseUrl } from "../../../../api/vars/vars"

interface Payment {
  stripe_payment_intent_id: string
  amount: number
  currency: string
  status: string
  created_at: string
}

interface TransactionDetailsResponse {
  payments: Payment[]
}

const columnHelper = createColumnHelper<Payment>()

const InvoiceListTable = () => {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const authToken = localStorage.getItem("auth_token")

        if (!authToken) {
          throw new Error("No authentication token found")
        }

        const response = await fetch(`${getBaseUrl()}transactions/transactions_details/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        })

        if (response.status === 401) {
          window.location.href = "/en/login"
          return
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result: TransactionDetailsResponse = await response.json()
        setPayments(result.payments || [])
      } catch (err) {
        console.error("Error fetching payments:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch payments")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const columns = useMemo<ColumnDef<Payment, any>[]>(
    () => [
      columnHelper.accessor("created_at", {
        header: "Date",
        cell: ({ row }) => (
          <Typography>
            {format(parseISO(row.original.created_at), "MMM dd, yyyy HH:mm")}
          </Typography>
        ),
      }),
      columnHelper.accessor("amount", {
        header: "Amount",
        cell: ({ row }) => (
          <Typography className="font-medium">
            {row.original.currency} {(row.original.amount / 100).toFixed(2)}
          </Typography>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => (
          <span
            style={{
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              color: "#fff",
              fontWeight: 500,
              backgroundColor:
                row.original.status === "paid"
                  ? "#4CAF50"
                  : row.original.status === "pending"
                  ? "#FFC107"
                  : "#F44336",
            }}
          >
            {row.original.status}
          </span>
        ),
      }),
      columnHelper.accessor("stripe_payment_intent_id", {
        header: "Payment Intent ID",
        cell: ({ row }) => (
          <Typography variant="body2" style={{ fontFamily: "monospace" }}>
            {row.original.stripe_payment_intent_id}
          </Typography>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data: payments,
    columns,
    filterFns: {} as any,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  if (loading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Typography>Loading invoices...</Typography>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Typography color="error">Error: {error}</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="flex justify-between items-center">
        <Typography variant="h6">Payment History</Typography>
        <CustomTextField
          select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          style={{ width: "70px" }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </CustomTextField>
      </CardContent>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #30334A",
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      border: "1px solid #30334A",
                      padding: "0.75rem",
                      textAlign: "left",
                    }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    style={{
                      border: "1px solid #30334A",
                      padding: "0.75rem",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TablePagination
        component={() => <TablePaginationComponent table={table as any} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={(e) => table.setPageSize(Number(e.target.value))}
      />
    </Card>
  )
}
// ,mmn 
export default InvoiceListTable
