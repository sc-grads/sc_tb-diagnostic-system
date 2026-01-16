import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { DashboardNav } from "@/components/dashboard-nav"
import { ResultsDisplay } from "@/components/results-display"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ResultsPage({ params }: PageProps) {
  const supabase = await createClient()
  const { id } = await params

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get prediction details
  const { data: prediction, error } = await supabase.from("predictions").select("*").eq("id", id).single()

  if (error || !prediction) {
    notFound()
  }

  // Verify user owns this prediction
  if (prediction.user_id !== user.id) {
    redirect("/dashboard")
  }

  // Get patient metadata
  const { data: metadata } = await supabase.from("patient_metadata").select("*").eq("prediction_id", id).single()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav user={user} profile={profile} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:pl-72">
        <ResultsDisplay prediction={prediction} metadata={metadata} />
      </main>
    </div>
  )
}
