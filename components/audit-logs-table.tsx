"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Eye, CheckCircle2, XCircle, AlertTriangle, Filter } from "lucide-react"
import Link from "next/link"

interface AuditLogsTableProps {
  predictions: any[]
  userEmail: string
}

export function AuditLogsTable({ predictions, userEmail }: AuditLogsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterLabel, setFilterLabel] = useState<string>("all")
  const [filterFeedback, setFilterFeedback] = useState<string>("all")

  const filteredPredictions = useMemo(() => {
    return predictions.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesLabel = filterLabel === "all" || p.label === filterLabel

      const matchesFeedback =
        filterFeedback === "all" ||
        (filterFeedback === "none" && !p.clinician_feedback) ||
        p.clinician_feedback === filterFeedback

      return matchesSearch && matchesLabel && matchesFeedback
    })
  }, [predictions, searchQuery, filterLabel, filterFeedback])

  const handleExport = () => {
    // Create CSV content
    const headers = [
      "ID",
      "Date",
      "Time",
      "Prediction",
      "Confidence",
      "Clinician Action",
      "Feedback Date",
      "Sensitivity",
      "Specificity",
      "Latency (ms)",
      "Patient Age",
      "Patient Sex",
      "HIV Status",
    ]

    const rows = filteredPredictions.map((p) => {
      const date = new Date(p.created_at)
      const feedbackDate = p.feedback_at ? new Date(p.feedback_at).toLocaleString() : "N/A"
      const metadata = p.patient_metadata?.[0] || {}

      return [
        p.id,
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        p.label,
        `${(p.probability * 100).toFixed(1)}%`,
        p.clinician_feedback || "No feedback",
        feedbackDate,
        p.sensitivity ? `${(p.sensitivity * 100).toFixed(1)}%` : "N/A",
        p.specificity ? `${(p.specificity * 100).toFixed(1)}%` : "N/A",
        p.inference_latency_ms || "N/A",
        metadata.age || "N/A",
        metadata.sex || "N/A",
        metadata.hiv_status || "N/A",
      ]
    })

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tb-audit-logs-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>
                {filteredPredictions.length} of {predictions.length} records
              </CardDescription>
            </div>
            <Button onClick={handleExport} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by ID or prediction..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterLabel} onValueChange={setFilterLabel}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by result" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Results</SelectItem>
                <SelectItem value="TB-positive">TB Positive</SelectItem>
                <SelectItem value="TB-negative">TB Negative</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterFeedback} onValueChange={setFilterFeedback}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="none">No Feedback</SelectItem>
                <SelectItem value="accept">Accepted</SelectItem>
                <SelectItem value="override">Overridden</SelectItem>
                <SelectItem value="flag">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Prediction</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Clinician Action</TableHead>
                  <TableHead>Patient Info</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPredictions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                      No records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPredictions.map((prediction) => {
                    const isPositive = prediction.label === "TB-positive"
                    const date = new Date(prediction.created_at)
                    const metadata = prediction.patient_metadata?.[0] || {}

                    return (
                      <TableRow key={prediction.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{date.toLocaleDateString()}</p>
                            <p className="text-xs text-gray-500">{date.toLocaleTimeString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {isPositive ? (
                              <AlertTriangle className="h-4 w-4 text-red-600" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                            )}
                            <span className="text-sm font-medium">{prediction.label}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={isPositive ? "destructive" : "default"}>
                            {(prediction.probability * 100).toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {prediction.clinician_feedback ? (
                            <div className="space-y-1">
                              <Badge
                                variant="outline"
                                className={
                                  prediction.clinician_feedback === "accept"
                                    ? "border-green-300 bg-green-50 text-green-700"
                                    : prediction.clinician_feedback === "override"
                                      ? "border-yellow-300 bg-yellow-50 text-yellow-700"
                                      : "border-red-300 bg-red-50 text-red-700"
                                }
                              >
                                {prediction.clinician_feedback === "accept" && (
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                )}
                                {prediction.clinician_feedback === "override" && <XCircle className="mr-1 h-3 w-3" />}
                                {prediction.clinician_feedback === "flag" && <AlertTriangle className="mr-1 h-3 w-3" />}
                                {prediction.clinician_feedback}
                              </Badge>
                              {prediction.feedback_at && (
                                <p className="text-xs text-gray-500">
                                  {new Date(prediction.feedback_at).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">Pending review</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs">
                            {metadata.age && <p>Age: {metadata.age}</p>}
                            {metadata.sex && <p className="capitalize">Sex: {metadata.sex}</p>}
                            {metadata.hiv_status && <p className="capitalize">HIV: {metadata.hiv_status}</p>}
                            {!metadata.age && !metadata.sex && !metadata.hiv_status && (
                              <span className="text-gray-500">N/A</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-xs">
                            <p>Sens: {((prediction.sensitivity || 0) * 100).toFixed(0)}%</p>
                            <p>Spec: {((prediction.specificity || 0) * 100).toFixed(0)}%</p>
                            <p className="text-gray-500">{prediction.inference_latency_ms}ms</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/dashboard/results/${prediction.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Diagnoses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{predictions.length}</p>
            <p className="text-xs text-gray-500">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Clinician</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold">{userEmail}</p>
            <p className="text-xs text-gray-500">Current user</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Feedback Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {predictions.length > 0
                ? ((predictions.filter((p) => p.clinician_feedback).length / predictions.length) * 100).toFixed(0)
                : 0}
              %
            </p>
            <p className="text-xs text-gray-500">
              {predictions.filter((p) => p.clinician_feedback).length} of {predictions.length} reviewed
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
