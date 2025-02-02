'use client'

import * as React from "react"
import { Menu } from 'lucide-react'
import { LayoutDashboard, Users, Briefcase, UserPlus, LinkIcon, BarChart2, Settings, CreditCard, HelpCircle } from 'lucide-react'
import { cn } from "@/lib/utils" 
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button" 
import { useCallback } from "react" 
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet" 
import {  useUser, useDescope } from '@descope/nextjs-sdk/client' 
import { LogOut } from 'lucide-react';
import { VisuallyHidden } from "@/components/visually-hidden"
import Link from "next/link"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", route: "/dashboard" },
  { icon: Users, label: "My Agents", route: "/dashboard/my-agents" },
  { icon: Briefcase, label: "Agent Suite", route: "/dashboard/pludo-agents" },
  { icon: UserPlus, label: "Create Agent", route: "/dashboard/create" },
  { icon: LinkIcon, label: "Integrations", route: "/dashboard/integrations" },
  { icon: BarChart2, label: "Analytics", route: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", route: "/dashboard/settings" },
  { icon: CreditCard, label: "Payments", route: "/dashboard/payments" },
  { icon: HelpCircle, label: "Support", route: "/dashboard/support" },  
  { icon: LogOut, label: "Logout", route:"/"}
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false) 
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false)
 
    // const sdk = useDescope()
    
  
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
   
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])  
 

  const memoizedSidebarContent = React.useMemo(() => <SidebarContent />, [])

  return (
    <>
      {/* Mobile Navbar */}
      <nav className={cn(
        "md:hidden fixed top-0 left-0 right-0 z-50 transition-colors duration-200",
        isScrolled ? "bg-white/10 backdrop-blur-lg" : "bg-transparent"
      )}>
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Link  href='/'>
          <h1 className="text-xl   font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            AI Dashboard
          </h1>
          </Link>
        </div>
      </nav>

      {/* Mobile Sheet */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="left" 
          className="w-72 p-0 bg-black backdrop-blur-xl border-r border-white/10"
          style={{
            '--sheet-animation-duration': '250ms',
            transform: 'translateZ(0)',
          } as React.CSSProperties}
        >
          <SheetTitle>
            <VisuallyHidden>Navigation Menu</VisuallyHidden>
          </SheetTitle>
          {memoizedSidebarContent}
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden md:flex w-64 flex-col fixed inset-y-0",
        "bg-black",
        "backdrop-blur-xl border-r border-white/10",
        className
      )}>
        {memoizedSidebarContent}
      </div>
    </>
  )
}

const SidebarContent = React.memo(function SidebarContent() { 
  const pathname = usePathname(); 
  const sdk = useDescope()
  // const { isAuthenticated } = useSession()
    const { user } = useUser()
    const router = useRouter(); 
    const handleClick = (route : string) => {   
      if (route === '/') { 
        handleLogout();
      } 
      router.push(route);
    } 
    const handleLogout = useCallback(() => {
      sdk.logout()
    }, [sdk])
  return (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <Link href={'/'}>
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          AI Dashboard
        </h1>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item, index) => (
          <a
            key={index}
            onClick={()=>{handleClick(item.route)}}
            className={cn(
              "flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200",
              `${pathname !== item.route ? 'text-zinc-400' : 'text-white'} hover:text-white`,
              `${pathname === item.route ? 'bg-purple-700 hover:bg-purple-800' : 'bg-black hover:bg-white/10'}`,
              "backdrop-blur-lg backdrop-saturate-150",
              "border border-transparent hover:border-white/10",
              "group"
            )}
          >
            <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="p-4 mt-auto">
        <div className="px-3 flex gap-2 py-2 items-center rounded-lg bg-white/5 backdrop-blur-lg">
          <p className="text-xs text-zinc-400">
            Logged in as
          </p>
              <Image
                                  src={user?.picture || "/images/Avatars/Avatar2.png"}
                                  alt='user'
                                  width={40}
                                  height={40}
                                  className='rounded-full cursor-pointer'
                                />
        </div>
      </div>
    </div>
  )
})

