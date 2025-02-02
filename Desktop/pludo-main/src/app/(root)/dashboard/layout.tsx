import { Sidebar } from "./Sidebar/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen ">
      <Sidebar />
      <main className=" md:pl-64 bg-custom-gradient">
        {children}
      </main>
    </div>
  )
}

