"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, XCircle, AlertTriangle, Clock, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResultsDisplayProps {
  prediction: any
  metadata: any
}

export function ResultsDisplay({ prediction, metadata }: ResultsDisplayProps) {
  const [feedback, setFeedback] = useState<string | null>(prediction.clinician_feedback)
  const [notes, setNotes] = useState(prediction.clinician_notes || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const router = useRouter()

  const isPositive = prediction.label === "TB-positive"
  const confidence = (prediction.probability * 100).toFixed(1)

  const handleFeedback = async (feedbackType: string) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          predictionId: prediction.id,
          feedback: feedbackType,
          notes,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit feedback")

      setFeedback(feedbackType)
      router.refresh()
    } catch (error) {
      console.error("[v0] Feedback error:", error)
      alert("Failed to submit feedback")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Diagnostic Results</h1>
        <p className="mt-2 text-sm text-gray-600">AI-powered TB detection analysis</p>
      </div>

      {/* Main Results Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image and Heatmap Visualization */}
        <Card>
          <CardHeader>
            <CardTitle>X-Ray Analysis</CardTitle>
            <CardDescription>Original image and AI-generated heatmap overlay</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={showHeatmap ? "heatmap" : "original"} onValueChange={(v) => setShowHeatmap(v === "heatmap")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="original">Original</TabsTrigger>
                <TabsTrigger value="heatmap">Grad-CAM Heatmap</TabsTrigger>
              </TabsList>
              <TabsContent value="original" className="mt-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-black">
                  <Image
                    src={prediction.image_path || "/placeholder.svg"}
                    alt="Chest X-ray"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">Original chest X-ray image</p>
              </TabsContent>
              <TabsContent value="heatmap" className="mt-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-black">
                  <Image
                    src={prediction.heatmap_path || "/placeholder.svg"}
                    alt="Grad-CAM heatmap"
                    fill
                    className="object-contain"
                  />
                  {/* Heatmap overlay simulation */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-yellow-500/20 to-transparent" />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Grad-CAM heatmap showing AI attention regions (red = high activation)
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Prediction Results */}
        <div className="space-y-6">
          {/* AI Prediction Card */}
          <Card className={isPositive ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {isPositive ? (
                    <>
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                      <span className="text-red-900">TB Positive</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-green-900">TB Negative</span>
                    </>
                  )}
                </CardTitle>
                <Badge variant={isPositive ? "destructive" : "default"} className="text-sm">
                  {confidence}% Confidence
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className={isPositive ? "text-red-900" : "text-green-900"}>Confidence Level</span>
                    <span className={`font-semibold ${isPositive ? "text-red-900" : "text-green-900"}`}>
                      {confidence}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className={`h-full ${isPositive ? "bg-red-600" : "bg-green-600"}`}
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-xs text-gray-600">Sensitivity</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {((prediction.sensitivity || 0) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-3">
                    <p className="text-xs text-gray-600">Specificity</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {((prediction.specificity || 0) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <Clock className="h-4 w-4" />
                  <span>Inference time: {prediction.inference_latency_ms}ms</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patient Metadata */}
          {metadata && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {metadata.age && (
                    <div>
                      <p className="text-xs text-gray-600">Age</p>
                      <p className="text-sm font-medium text-gray-900">{metadata.age} years</p>
                    </div>
                  )}
                  {metadata.sex && (
                    <div>
                      <p className="text-xs text-gray-600">Sex</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{metadata.sex}</p>
                    </div>
                  )}
                  {metadata.hiv_status && (
                    <div>
                      <p className="text-xs text-gray-600">HIV Status</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{metadata.hiv_status}</p>
                    </div>
                  )}
                </div>
                {metadata.additional_notes && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-600">Clinical Notes</p>
                    <p className="mt-1 text-sm text-gray-900">{metadata.additional_notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Clinician Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>Clinician Feedback</CardTitle>
              <CardDescription>Review and provide feedback on the AI prediction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedback ? (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-600" />
                    <p className="font-medium text-blue-900">Feedback submitted: {feedback}</p>
                  </div>
                  {notes && <p className="mt-2 text-sm text-blue-800">{notes}</p>}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      className="flex flex-col gap-2 h-auto py-4 border-green-200 hover:bg-green-50 hover:border-green-400 bg-transparent"
                      onClick={() => handleFeedback("accept")}
                      disabled={isSubmitting}
                    >
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <span className="text-sm font-medium">Accept</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col gap-2 h-auto py-4 border-yellow-200 hover:bg-yellow-50 hover:border-yellow-400 bg-transparent"
                      onClick={() => handleFeedback("override")}
                      disabled={isSubmitting}
                    >
                      <XCircle className="h-6 w-6 text-yellow-600" />
                      <span className="text-sm font-medium">Override</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col gap-2 h-auto py-4 border-red-200 hover:bg-red-50 hover:border-red-400 bg-transparent"
                      onClick={() => handleFeedback("flag")}
                      disabled={isSubmitting}
                    >
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                      <span className="text-sm font-medium">Flag</span>
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add clinical observations or reasons for your decision..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
