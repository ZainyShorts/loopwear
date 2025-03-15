import { Book, Download, Plus, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Sidebar from "@/components/sidebar"

export default function GradesPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Same as in dashboard.tsx */}
      <Sidebar/>
      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header - Similar to dashboard.tsx */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="font-semibold text-xl text-gray-800">Grade Management</h2>
            {/* ... Header content ... */}
          </div>
        </header>

        {/* Grades Page Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Class and Subject Selection */}
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
                <Label htmlFor="subject-select">Select Subject</Label>
                <Select>
                  <SelectTrigger id="subject-select">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full">
                  <Book className="mr-2 h-4 w-4" />
                  Load Grades
                </Button>
              </div>
            </div>
          </div>

          {/* Grade Entry Table */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Grade Entry - Class 10A Mathematics</CardTitle>
              <CardDescription>Enter or update student grades</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Quiz 1 (10%)</TableHead>
                    <TableHead>Midterm (30%)</TableHead>
                    <TableHead>Project (20%)</TableHead>
                    <TableHead>Final Exam (40%)</TableHead>
                    <TableHead>Overall Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Alice Johnson", id: "10A001", quiz1: 85, midterm: 78, project: 92, final: 88 },
                    { name: "Bob Smith", id: "10A002", quiz1: 72, midterm: 80, project: 85, final: 79 },
                    { name: "Charlie Brown", id: "10A003", quiz1: 90, midterm: 85, project: 88, final: 91 },
                    { name: "Diana Prince", id: "10A004", quiz1: 95, midterm: 92, project: 97, final: 94 },
                    { name: "Ethan Hunt", id: "10A005", quiz1: 78, midterm: 75, project: 80, final: 82 },
                  ].map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={student.quiz1} className="w-16" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={student.midterm} className="w-16" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={student.project} className="w-16" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={student.final} className="w-16" />
                      </TableCell>
                      <TableCell>
                        {Math.round(
                          (student.quiz1 * 0.1 + student.midterm * 0.3 + student.project * 0.2 + student.final * 0.4) *
                            10,
                        ) / 10}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-between">
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Assessment
                </Button>
                <Button>Save Grades</Button>
              </div>
            </CardContent>
          </Card>

          {/* Grade Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Average</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% from last term</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Highest Grade</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">97%</div>
                <p className="text-xs text-muted-foreground">Diana Prince</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lowest Grade</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <p className="text-xs text-muted-foreground">Bob Smith</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students at Risk</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Below 75% overall grade</p>
              </CardContent>
            </Card>
          </div>

          {/* Grade Distribution and Reports */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Overall grades for Class 10A Mathematics</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add a chart component here */}
                <div className="h-80 bg-gray-100 flex items-center justify-center">[Grade Distribution Chart]</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Grade Reports</CardTitle>
                <CardDescription>Generate and download grade reports</CardDescription>
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
                        <SelectItem value="individual">Individual Student Report</SelectItem>
                        <SelectItem value="class">Class Summary Report</SelectItem>
                        <SelectItem value="progress">Progress Report</SelectItem>
                        <SelectItem value="custom">Custom Report</SelectItem>
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

