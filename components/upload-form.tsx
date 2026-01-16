"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface UploadFormProps {
  userId: string
}

export function UploadForm({ userId }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [age, setAge] = useState("")
  const [sex, setSex] = useState<string>("")
  const [hivStatus, setHivStatus] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file (JPEG or PNG)")
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }

      setSelectedFile(file)
      setError(null)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      setError("Please select an X-ray image")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("userId", userId)
      formData.append("age", age)
      formData.append("sex", sex)
      formData.append("hivStatus", hivStatus)
      formData.append("notes", notes)

      // Call API endpoint to process the upload and run inference
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const result = await response.json()

      // Redirect to results page with the prediction ID
      router.push(`/dashboard/results/${result.predictionId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during upload")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>X-Ray Image</CardTitle>
            <CardDescription>Upload a chest X-ray image (JPEG or PNG, max 10MB)</CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedFile ? (
              <label
                htmlFor="file-upload"
                className="flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-blue-400 hover:bg-blue-50"
              >
                <ImageIcon className="mb-3 h-12 w-12 text-gray-400" />
                <p className="mb-2 text-sm font-medium text-gray-700">Click to upload X-ray image</p>
                <p className="text-xs text-gray-500">JPEG or PNG (MAX. 10MB)</p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="relative">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-black">
                  {previewUrl && (
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="X-ray preview"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="mt-3 rounded-md bg-blue-50 p-3">
                  <p className="text-sm font-medium text-blue-900">{selectedFile.name}</p>
                  <p className="text-xs text-blue-700">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Patient Metadata Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Optional metadata to improve diagnostic accuracy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter patient age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  min="0"
                  max="150"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="sex">Sex</Label>
                <Select value={sex} onValueChange={setSex}>
                  <SelectTrigger id="sex">
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hivStatus">HIV Status</Label>
                <Select value={hivStatus} onValueChange={setHivStatus}>
                  <SelectTrigger id="hivStatus">
                    <SelectValue placeholder="Select HIV status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Enter any relevant clinical observations..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isUploading || !selectedFile}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Analyze X-Ray
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
