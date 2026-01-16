"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, AlertTriangle, Eye } from "lucide-react"

interface ResultsListProps {
  predictions: any[]
}

export function ResultsList({ predictions }: ResultsListProps) {
  if (predictions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-600">No results yet. Upload an X-ray to get started.</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard">Upload X-Ray</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {predictions.map((prediction) => {
        const isPositive = prediction.label === "TB-positive"
        const confidence = (prediction.probability * 100).toFixed(1)
        const date = new Date(prediction.created_at).toLocaleString()

        return (
          <Card key={prediction.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                {isPositive ? (
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                ) : (
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                )}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{prediction.label}</h3>
                    <Badge variant={isPositive ? "destructive" : "default"}>{confidence}% confidence</Badge>
                    {prediction.clinician_feedback && (
                      <Badge variant="outline" className="capitalize">
                        {prediction.clinician_feedback}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{date}</p>
                </div>
              </div>
              <Button asChild variant="outline">
                <Link href={`/dashboard/results/${prediction.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
