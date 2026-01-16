import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { MonitoringDashboard } from "@/components/monitoring-dashboard"

export default async function MonitoringPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get all predictions for analytics
  const { data: predictions } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Get patient metadata for fairness analysis
  const { data: allMetadata } = await supabase.from("patient_metadata").select("*, predictions!inner(*)")

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} profile={profile} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:pl-72">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">System Monitoring</h1>
          <p className="mt-2 text-sm text-gray-600">Performance metrics and fairness analysis</p>
        </div>
        <MonitoringDashboard predictions={predictions || []} metadata={allMetadata || []} />
      </main>
    </div>
  )
}
