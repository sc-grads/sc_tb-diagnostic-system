"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, Clock, AlertTriangle, Users, BarChart3 } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useMemo } from "react"

interface MonitoringDashboardProps {
  predictions: any[]
  metadata: any[]
}

export function MonitoringDashboard({ predictions, metadata }: MonitoringDashboardProps) {
  const stats = useMemo(() => {
    if (predictions.length === 0) {
      return {
        totalPredictions: 0,
        sensitivity: 0,
        specificity: 0,
        avgLatency: 0,
        positiveRate: 0,
        feedbackRate: 0,
        acceptRate: 0,
        overrideRate: 0,
        flagRate: 0,
      }
    }

    const totalPredictions = predictions.length
    const withFeedback = predictions.filter((p) => p.clinician_feedback).length
    const accepted = predictions.filter((p) => p.clinician_feedback === "accept").length
    const overridden = predictions.filter((p) => p.clinician_feedback === "override").length
    const flagged = predictions.filter((p) => p.clinician_feedback === "flag").length
    const positive = predictions.filter((p) => p.label === "TB-positive").length

    const avgSensitivity = predictions.reduce((sum, p) => sum + (p.sensitivity || 0), 0) / totalPredictions

    const avgSpecificity = predictions.reduce((sum, p) => sum + (p.specificity || 0), 0) / totalPredictions

    const avgLatency = predictions.reduce((sum, p) => sum + (p.inference_latency_ms || 0), 0) / totalPredictions

    return {
      totalPredictions,
      sensitivity: avgSensitivity,
      specificity: avgSpecificity,
      avgLatency: Math.round(avgLatency),
      positiveRate: (positive / totalPredictions) * 100,
      feedbackRate: (withFeedback / totalPredictions) * 100,
      acceptRate: withFeedback > 0 ? (accepted / withFeedback) * 100 : 0,
      overrideRate: withFeedback > 0 ? (overridden / withFeedback) * 100 : 0,
      flagRate: withFeedback > 0 ? (flagged / withFeedback) * 100 : 0,
    }
  }, [predictions])

  // Fairness analysis by demographics
  const fairnessData = useMemo(() => {
    const byGender = { male: { total: 0, positive: 0 }, female: { total: 0, positive: 0 } }
    const byAge = {
      "0-18": { total: 0, positive: 0 },
      "19-40": { total: 0, positive: 0 },
      "41-65": { total: 0, positive: 0 },
      "65+": { total: 0, positive: 0 },
    }
    const byHIV = {
      positive: { total: 0, positive: 0 },
      negative: { total: 0, positive: 0 },
      unknown: { total: 0, positive: 0 },
    }

    metadata.forEach((m: any) => {
      if (!m.predictions) return

      const isPositive = m.predictions.label === "TB-positive"

      // Gender analysis
      if (m.sex === "male" || m.sex === "female") {
        byGender[m.sex].total++
        if (isPositive) byGender[m.sex].positive++
      }

      // Age analysis
      if (m.age) {
        let ageGroup: keyof typeof byAge
        if (m.age < 19) ageGroup = "0-18"
        else if (m.age < 41) ageGroup = "19-40"
        else if (m.age < 66) ageGroup = "41-65"
        else ageGroup = "65+"

        byAge[ageGroup].total++
        if (isPositive) byAge[ageGroup].positive++
      }

      // HIV analysis
      if (m.hiv_status && m.hiv_status !== "unknown") {
        byHIV[m.hiv_status as keyof typeof byHIV].total++
        if (isPositive) byHIV[m.hiv_status as keyof typeof byHIV].positive++
      }
    })

    return { byGender, byAge, byHIV }
  }, [metadata])

  // Performance over time
  const performanceData = useMemo(() => {
    const last30Days = predictions.slice(0, 30).reverse()
    return last30Days.map((p, idx) => ({
      index: idx + 1,
      sensitivity: (p.sensitivity || 0) * 100,
      specificity: (p.specificity || 0) * 100,
      latency: p.inference_latency_ms || 0,
    }))
  }, [predictions])

  // Feedback distribution
  const feedbackData = [
    { name: "Accepted", value: stats.acceptRate, color: "#10b981" },
    { name: "Overridden", value: stats.overrideRate, color: "#eab308" },
    { name: "Flagged", value: stats.flagRate, color: "#ef4444" },
  ].filter((d) => d.value > 0)

  // Demographic distribution charts
  const genderChartData = Object.entries(fairnessData.byGender)
    .filter(([_, data]) => data.total > 0)
    .map(([gender, data]) => ({
      name: gender.charAt(0).toUpperCase() + gender.slice(1),
      positiveRate: data.total > 0 ? ((data.positive / data.total) * 100).toFixed(1) : 0,
      total: data.total,
    }))

  const ageChartData = Object.entries(fairnessData.byAge)
    .filter(([_, data]) => data.total > 0)
    .map(([age, data]) => ({
      name: age,
      positiveRate: data.total > 0 ? ((data.positive / data.total) * 100).toFixed(1) : 0,
      total: data.total,
    }))

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPredictions}</div>
            <p className="text-xs text-muted-foreground">{stats.positiveRate.toFixed(1)}% positive</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sensitivity</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.sensitivity * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">True positive rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Specificity</CardTitle>
            <BarChart3 className="h-4 w-4 text-cyan-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.specificity * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">True negative rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgLatency}ms</div>
            <p className="text-xs text-muted-foreground">Inference time</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Over Time</CardTitle>
            <CardDescription>Sensitivity and specificity trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="index" label={{ value: "Predictions", position: "insideBottom", offset: -5 }} />
                <YAxis label={{ value: "Percentage (%)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sensitivity" stroke="#10b981" name="Sensitivity" />
                <Line type="monotone" dataKey="specificity" stroke="#06b6d4" name="Specificity" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clinician Feedback Distribution</CardTitle>
            <CardDescription>Feedback on AI predictions ({stats.feedbackRate.toFixed(0)}% reviewed)</CardDescription>
          </CardHeader>
          <CardContent>
            {feedbackData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={feedbackData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {feedbackData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-[300px] items-center justify-center text-sm text-gray-500">
                No feedback data available yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Fairness Analysis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Fairness Analysis
              </CardTitle>
              <CardDescription>TB positive rates across demographic groups</CardDescription>
            </div>
            {genderChartData.length === 0 && ageChartData.length === 0 && (
              <Badge variant="outline">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Limited data
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h4 className="mb-4 text-sm font-semibold">By Gender</h4>
              {genderChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={genderChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "Positive Rate (%)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Bar dataKey="positiveRate" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-sm text-gray-500">
                  No gender data available
                </div>
              )}
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold">By Age Group</h4>
              {ageChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ageChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "Positive Rate (%)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Bar dataKey="positiveRate" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-[200px] items-center justify-center text-sm text-gray-500">
                  No age data available
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      {(stats.flagRate > 10 || stats.avgLatency > 1000) && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900">
              <AlertTriangle className="h-5 w-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {stats.flagRate > 10 && (
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm font-medium text-yellow-900">High flag rate detected</p>
                <p className="text-xs text-yellow-700">
                  {stats.flagRate.toFixed(1)}% of predictions have been flagged. Review for potential model issues.
                </p>
              </div>
            )}
            {stats.avgLatency > 1000 && (
              <div className="rounded-lg bg-white p-3">
                <p className="text-sm font-medium text-yellow-900">High latency detected</p>
                <p className="text-xs text-yellow-700">
                  Average inference time is {stats.avgLatency}ms. Consider optimizing the model.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
