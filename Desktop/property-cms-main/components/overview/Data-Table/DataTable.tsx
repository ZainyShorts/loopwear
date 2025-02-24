"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Copy, Check, FilePenLine, ChevronLeft, ChevronRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DataTableProps {
  headers: string[]
  data?: any[]
  onAddButton?: () => void
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
}

export function DataTable({ headers, data = [], onAddButton, onDelete, onEdit }: DataTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const formatId = (id: string) => {
    return id.slice(0, 4) + "..."
  }

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="rounded-lg border overflow-hidden bg-background shadow-sm">
      <div className="overflow-x-auto thin-scrollbar">
        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-widest whitespace-nowrap"
                >
                  {header}
                </TableHead>
              ))}
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-widest whitespace-nowrap">
                Edit
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-widest whitespace-nowrap">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-400">
            {currentData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.entries(row).map(([key, val]: [string, any], index) => (
                  <TableCell key={index} className="px-6 py-4 whitespace-nowrap text-sm">
                    {key === "_id" ? (
                      <div className="flex items-center space-x-2">
                        <span>{formatId(val)}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleCopy(val)}
                                className="h-6 w-6 p-0"
                              >
                                {copiedId === val ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copiedId === val ? "Copied" : "Copy"}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ) : (
                      val
                    )}
                  </TableCell>
                ))}
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit && onEdit(row._id)}
                    className="text-white hover:text-gray-200"
                  >
                    <FilePenLine className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete && onDelete(row._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 dark:bg-foreground dark:hover:bg-foreground/90 dark:text-background"
                onClick={onAddButton}
              >
                <Plus className="h-4 w-4" />
                Add record
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a new record to the table</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              onClick={() => goToPage(page)}
              className={`w-8 h-8 ${
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

