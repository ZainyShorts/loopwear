import { Calendar, Download, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Sidebar from "@/components/sidebar"

export default function AttendancePage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Same as in dashboard.tsx */}
      {/* <aside className="w-64 bg-white shadow-md">... Sidebar content ...</aside> */}
      <Sidebar/>
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header - Similar to dashboard.tsx */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800">Attendance Management</h2>
            {/* ... Header content ... */}
          </div>
        </header>

        {/* Attendance Page Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Class and Date Selection */}
          <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="class-select">Select Class</Label>
                <Select>
                  <SelectTrigger id="class-select">
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10a">Class 10A</SelectItem>
                    <SelectItem value="10b">Class 10B</SelectItem>
                    <SelectItem value="11a">Class 11A</SelectItem>
                    <SelectItem value="11b">Class 11B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="date-select">Select Date</Label>
                <Input type="date" id="date-select" />
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Load Attendance
                </Button>
              </div>
            </div>
          </div>

          {/* Attendance Marking Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Mark Attendance - Class 10A (May 25, 2023)</CardTitle>
              <CardDescription>Click on the status to change</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Alice Johnson", id: "10A001", status: "present" },
                    { name: "Bob Smith", id: "10A002", status: "absent" },
                    { name: "Charlie Brown", id: "10A003", status: "late" },
                    { name: "Diana Prince", id: "10A004", status: "present" },
                    { name: "Ethan Hunt", id: "10A005", status: "excused" },
                  ].map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Badge
                                variant={
                                  student.status === "present"
                                    ? "default"
                                    : student.status === "absent"
                                      ? "destructive"
                                      : student.status === "late"
                                        ? "warning"
                                        : "secondary"
                                }
                              >
                                {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                              </Badge>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Present</DropdownMenuItem>
                            <DropdownMenuItem>Absent</DropdownMenuItem>
                            <DropdownMenuItem>Late</DropdownMenuItem>
                            <DropdownMenuItem>Excused</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>
                        <Input placeholder="Add note" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button>Save Attendance</Button>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Present</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86%</div>
                <p className="text-xs text-muted-foreground">21 students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Absent</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8%</div>
                <p className="text-xs text-muted-foreground">2 students</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Late</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4%</div>
                <p className="text-xs text-muted-foreground">1 student</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Excused</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2%</div>
                <p className="text-xs text-muted-foreground">1 student</p>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Trends and Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Trends</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add a chart component here */}
                <div className="h-80 bg-gray-100 flex items-center justify-center">[Attendance Trends Chart]</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Attendance Reports</CardTitle>
                <CardDescription>Generate and download reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="report-type">Report Type</Label>
                    <Select>
                      <SelectTrigger id="report-type">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily Report</SelectItem>
                        <SelectItem value="weekly">Weekly Report</SelectItem>
                        <SelectItem value="monthly">Monthly Report</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="report-format">Format</Label>
                    <Select>
                      <SelectTrigger id="report-format">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

