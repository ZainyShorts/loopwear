import { Edit, Download, Send } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import Sidebar from "@/components/sidebar"

export default function StudentPage() {
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
            <h2 className="font-semibold text-xl text-gray-800">Student Profile</h2>
            {/* ... Header content ... */}
          </div>
        </header>

        {/* Student Profile Content */}
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Student Overview */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
              <div className="flex items-center">
                <Avatar className="h-24 w-24 mr-4">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">John Doe</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Student ID: 12345678</p>
                  <div className="mt-2">
                    <Badge>Grade 10</Badge>
                    <Badge variant="outline" className="ml-2">
                      Class 10A
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Report
                </Button>
                <Button size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="academics">Academics</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="health">Health</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Date of Birth:</Label>
                        <span>January 15, 2005</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Gender:</Label>
                        <span>Male</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Address:</Label>
                        <span>123 School St, Cityville</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Phone:</Label>
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Email:</Label>
                        <span>john.doe@school.edu</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Name:</Label>
                        <span>Jane Doe</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Relationship:</Label>
                        <span>Mother</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Phone:</Label>
                        <span>(555) 987-6543</span>
                      </div>
                      <div className="flex justify-between">
                        <Label>Email:</Label>
                        <span>jane.doe@email.com</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="academics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Semester Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">GPA</span>
                      <span className="text-2xl font-bold">3.75</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Grades by Subject</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span>Mathematics</span>
                          <Badge>A</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Science</span>
                          <Badge>A-</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>English</span>
                          <Badge>B+</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>History</span>
                          <Badge>A</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Academic History</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add a chart or table for academic history */}
                  <div className="h-64 bg-gray-100 flex items-center justify-center">[Academic Performance Chart]</div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Attendance Rate</span>
                      <span className="text-2xl font-bold">95%</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Recent Absences</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between items-center">
                          <span>May 15, 2023</span>
                          <Badge variant="outline">Excused</Badge>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>April 22, 2023</span>
                          <Badge variant="destructive">Unexcused</Badge>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>March 10, 2023</span>
                          <Badge variant="outline">Excused</Badge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add a chart for attendance trends */}
                  <div className="h-64 bg-gray-100 flex items-center justify-center">[Attendance Trends Chart]</div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="health" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Health Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Allergies</h4>
                      <ul className="list-disc list-inside">
                        <li>Peanuts</li>
                        <li>Penicillin</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Medications</h4>
                      <ul className="list-disc list-inside">
                        <li>Inhaler (as needed)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Vaccinations</h4>
                      <ul className="space-y-2">
                        <li className="flex justify-between items-center">
                          <span>MMR</span>
                          <Badge variant="outline">Up to date</Badge>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>Tdap</span>
                          <Badge variant="outline">Up to date</Badge>
                        </li>
                        <li className="flex justify-between items-center">
                          <span>COVID-19</span>
                          <Badge>Due in 3 months</Badge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

