import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, Activity } from "lucide-react"

export default function SignupSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
            <Activity className="h-8 w-8 text-white" />
          </div>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <CardHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl">Check Your Email</CardTitle>
            <CardDescription className="text-center">We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-sm text-gray-600">
              Please check your email and click the confirmation link to activate your account. Once confirmed, you can
              sign in to access the TB diagnostic system.
            </p>
            <Button asChild className="w-full">
              <Link href="/auth/login">Return to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
