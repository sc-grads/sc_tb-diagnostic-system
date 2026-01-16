import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { predictionId, feedback, notes } = await request.json()

    if (!predictionId || !feedback) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update prediction with clinician feedback
    const { error } = await supabase
      .from("predictions")
      .update({
        clinician_feedback: feedback,
        clinician_notes: notes || null,
        feedback_at: new Date().toISOString(),
      })
      .eq("id", predictionId)
      .eq("user_id", user.id) // Ensure user owns this prediction

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Feedback error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to submit feedback" },
      { status: 500 },
    )
  }
}
