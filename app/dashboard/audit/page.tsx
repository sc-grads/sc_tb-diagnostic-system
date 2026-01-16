import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { AuditLogsTable } from "@/components/audit-logs-table"

export default async function AuditLogsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get all predictions with metadata for audit trail
  const { data: predictions } = await supabase
    .from("predictions")
    .select("*, patient_metadata(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} profile={profile} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:pl-72">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Audit Logs</h1>
          <p className="mt-2 text-sm text-gray-600">
            Complete history of all diagnostic activities and clinician actions
          </p>
        </div>
        <AuditLogsTable predictions={predictions || []} userEmail={user.email || ""} />
      </main>
    </div>
  )
}
