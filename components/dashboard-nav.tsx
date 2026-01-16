"use client"

import { Activity, Upload, FileText, BarChart3, LogOut, ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useMemo } from "react"

interface DashboardNavProps {
  user: any
  profile: any
}

export function DashboardNav({ user, profile }: DashboardNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(true)

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  const allNavigation = [
    { name: "New Upload", href: "/dashboard", icon: Upload, roles: ["clinician", "it", "admin"] },
    { name: "Results", href: "/dashboard/results", icon: FileText, roles: ["clinician", "it", "admin"] },
    { name: "Monitoring", href: "/dashboard/monitoring", icon: BarChart3, roles: ["admin", "it"] },
    { name: "Audit Logs", href: "/dashboard/audit", icon: FileText, roles: ["admin"] },
  ]

  const navigation = useMemo(() => {
    const userRole = profile?.role || "clinician"
    return allNavigation.filter((item) => item.roles.includes(userRole))
  }, [profile?.role])

  const NavContent = ({ isCollapsed = false }: { isCollapsed?: boolean }) => (
    <>
      <div
        className={`flex items-center gap-3 border-b border-gray-200 px-6 py-4 ${isCollapsed ? "justify-center px-2" : ""}`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
          <Activity className="h-6 w-6 text-white" />
        </div>
        {!isCollapsed && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900">TB Diagnostic</h2>
            <p className="text-xs text-gray-600">AI-powered detection</p>
          </div>
        )}
      </div>

      <nav className={`flex-1 space-y-1 px-4 py-4 ${isCollapsed ? "px-2" : ""}`}>
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              } ${isCollapsed ? "justify-center px-2" : ""}`}
              title={isCollapsed ? item.name : undefined}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && item.name}
            </Link>
          )
        })}
      </nav>

      {!isCollapsed && (
        <div className="border-t border-gray-200 p-4">
          <div className="mb-3 rounded-lg bg-gray-50 px-3 py-2">
            <p className="text-xs font-medium text-gray-500">Signed in as</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{profile?.full_name || "User"}</p>
            <p className="text-xs text-gray-600">{user?.email}</p>
            <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
              {profile?.role || "clinician"}
            </span>
          </div>
          <Button variant="outline" className="w-full bg-transparent" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      )}

      {isCollapsed && (
        <div className="border-t border-gray-200 p-2">
          <Button
            variant="outline"
            size="icon"
            className="w-full bg-transparent"
            onClick={handleSignOut}
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )

  return (
    <>
      {/* Mobile navigation */}
      <div className="border-b border-gray-200 bg-white lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900">TB Diagnostic</span>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {collapsed ? (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-0 top-6 z-50 hidden h-10 w-10 rounded-r-lg border border-l-0 border-gray-200 bg-white shadow-sm hover:bg-gray-50 lg:flex"
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      ) : (
        <>
          <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
            <div className="flex flex-col border-r border-gray-200 bg-white">
              <NavContent isCollapsed={false} />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-3 top-6 h-6 w-6 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50"
              onClick={() => setCollapsed(true)}
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </Button>
          </div>
          <div className="hidden lg:block lg:w-64" />
        </>
      )}
    </>
  )
}
