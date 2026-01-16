import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Activity } from "lucide-react"
import Link from "next/link"

export default function EmailConfirmedPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">TB Diagnostic System</h1>
          <p className="mt-2 text-sm text-gray-600">AI-powered tuberculosis detection</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl">Email Confirmed!</CardTitle>
            <CardDescription className="text-center">Your account has been successfully verified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              Your email has been confirmed and your account is now active. You can now sign in to access the TB
              diagnostic system.
            </p>
            <Button asChild className="w-full">
              <Link href="/auth/login">Continue to Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
