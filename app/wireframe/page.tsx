export default function WireframePage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">TB Diagnostic Dashboard - Wireframes</h1>
          <p className="text-muted-foreground">
            Complete wireframe documentation for the clinician-facing AI-powered TB diagnostic system
          </p>
        </div>

        {/* Landing Page */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">1. Landing Page</h2>
          <div className="border-2 border-dashed rounded-lg p-8 bg-card">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <div className="h-12 w-48 bg-primary/20 mx-auto rounded flex items-center justify-center">
                  LOGO / TB Diagnostic System
                </div>
                <div className="h-16 bg-muted rounded">
                  <p className="p-4">Hero Title: AI-Powered TB Diagnostic System</p>
                </div>
                <div className="h-12 bg-muted rounded">
                  <p className="p-3">Subtitle: Empowering clinicians with AI assistance</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <div className="h-10 w-32 bg-primary/40 rounded">Sign In</div>
                  <div className="h-10 w-32 bg-muted rounded">Get Started</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication Pages */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">2. Authentication Pages</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Login */}
            <div className="border-2 border-dashed rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4">2a. Login Page</h3>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded">Email Input</div>
                <div className="h-8 bg-muted rounded">Password Input</div>
                <div className="h-10 bg-primary/40 rounded">Sign In Button</div>
                <div className="h-6 bg-muted/50 rounded text-center text-sm">Link to Signup</div>
              </div>
            </div>

            {/* Signup */}
            <div className="border-2 border-dashed rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4">2b. Signup Page</h3>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded">Full Name Input</div>
                <div className="h-8 bg-muted rounded">Email Input</div>
                <div className="h-8 bg-muted rounded">Password Input</div>
                <div className="h-8 bg-muted rounded">Role Select (Clinician/IT/Admin)</div>
                <div className="h-10 bg-primary/40 rounded">Create Account Button</div>
                <div className="h-6 bg-muted/50 rounded text-center text-sm">Link to Login</div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Layout */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">3. Dashboard Layout (All Pages)</h2>
          <div className="border-2 border-dashed rounded-lg p-4 bg-card">
            <div className="flex gap-4">
              {/* Sidebar */}
              <div className="w-64 border-2 border-dashed rounded p-4 space-y-4">
                <div className="font-semibold">Collapsible Sidebar</div>
                <div className="space-y-2">
                  <div className="h-8 bg-primary/20 rounded">← Collapse Button</div>
                  <div className="h-8 bg-muted rounded">🏥 TB Diagnostic System</div>
                  <div className="h-8 bg-primary/40 rounded">📤 New Upload</div>
                  <div className="h-8 bg-muted rounded">📊 Results</div>
                  <div className="h-8 bg-muted rounded">📈 Monitoring (IT/Admin)</div>
                  <div className="h-8 bg-muted rounded">📋 Audit Logs (Admin)</div>
                  <div className="mt-8 h-8 bg-destructive/20 rounded">🚪 Sign Out</div>
                </div>
                <div className="text-xs text-muted-foreground mt-4">Note: Collapses to arrow button only</div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 border-2 border-dashed rounded p-4">
                <div className="h-full bg-muted/30 rounded flex items-center justify-center">
                  Main Content Area (changes per page)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upload Page */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">4. New Upload Page</h2>
          <div className="border-2 border-dashed rounded-lg p-6 bg-card">
            <div className="space-y-6">
              <div className="h-10 bg-muted rounded flex items-center px-4">Page Header: Upload Chest X-Ray</div>

              {/* Upload Area */}
              <div className="border-2 border-dashed rounded-lg p-8 bg-muted/30">
                <div className="text-center space-y-4">
                  <div className="text-4xl">☁️</div>
                  <div>Drag & drop X-ray image here</div>
                  <div className="h-10 w-32 bg-primary/40 rounded mx-auto">Browse Files</div>
                  <div className="text-sm text-muted-foreground">Accepts: JPEG, PNG</div>
                </div>
              </div>

              {/* Image Preview */}
              <div className="h-64 border-2 border-dashed rounded bg-muted/20 flex items-center justify-center">
                Image Preview (appears after upload)
              </div>

              {/* Patient Metadata Form */}
              <div className="grid md:grid-cols-2 gap-4 border-t pt-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Patient Age</div>
                  <div className="h-10 bg-muted rounded">Input (optional)</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Sex</div>
                  <div className="h-10 bg-muted rounded">Select: Male/Female/Other</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">HIV Status</div>
                  <div className="h-10 bg-muted rounded">Select: Positive/Negative/Unknown</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Patient ID</div>
                  <div className="h-10 bg-muted rounded">Input (optional)</div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Additional Notes</div>
                <div className="h-24 bg-muted rounded">Textarea (optional)</div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <div className="h-12 w-48 bg-primary/40 rounded flex items-center justify-center">
                  Submit for Analysis
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results List Page */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">5. Results List Page</h2>
          <div className="border-2 border-dashed rounded-lg p-6 bg-card">
            <div className="space-y-4">
              <div className="h-10 bg-muted rounded flex items-center px-4">Page Header: Diagnostic Results</div>

              {/* Filter Bar */}
              <div className="flex gap-4">
                <div className="h-10 flex-1 bg-muted rounded">🔍 Search by Patient ID</div>
                <div className="h-10 w-32 bg-muted rounded">Filter Status</div>
              </div>

              {/* Results Table */}
              <div className="border rounded overflow-hidden">
                <div className="bg-muted/50 p-3 font-semibold grid grid-cols-6 gap-4">
                  <div>Date</div>
                  <div>Patient ID</div>
                  <div>Prediction</div>
                  <div>Confidence</div>
                  <div>Status</div>
                  <div>Action</div>
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 border-t grid grid-cols-6 gap-4 items-center">
                    <div className="h-6 bg-muted/30 rounded"></div>
                    <div className="h-6 bg-muted/30 rounded"></div>
                    <div className="h-6 bg-destructive/20 rounded">TB Positive</div>
                    <div className="h-6 bg-muted/30 rounded">95%</div>
                    <div className="h-6 bg-muted/30 rounded">Pending</div>
                    <div className="h-8 w-20 bg-primary/40 rounded">View</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Results Detail Page */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">6. Results Detail Page (with Grad-CAM)</h2>
          <div className="border-2 border-dashed rounded-lg p-6 bg-card">
            <div className="space-y-6">
              <div className="h-10 bg-muted rounded flex items-center px-4">Page Header: Diagnostic Result Details</div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column - Image */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="h-10 flex-1 bg-muted rounded">Tab: Original</div>
                    <div className="h-10 flex-1 bg-primary/40 rounded">Tab: Grad-CAM</div>
                  </div>
                  <div className="aspect-square border-2 border-dashed rounded bg-muted/20 flex items-center justify-center">
                    X-Ray Image with Grad-CAM Heatmap Overlay
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 bg-destructive/80 rounded"></div>
                    <div className="h-8 w-8 bg-destructive/60 rounded"></div>
                    <div className="h-8 w-8 bg-destructive/40 rounded"></div>
                    <div className="h-8 w-8 bg-destructive/20 rounded"></div>
                    <div className="text-sm">Attention Heatmap Legend</div>
                  </div>
                </div>

                {/* Right Column - Results */}
                <div className="space-y-4">
                  {/* Prediction Card */}
                  <div className="border rounded p-4 bg-destructive/10">
                    <div className="font-semibold mb-2">AI Prediction</div>
                    <div className="text-2xl font-bold">TB Positive</div>
                    <div className="text-sm text-muted-foreground mt-1">Confidence: 94.7%</div>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border rounded p-3 text-center">
                      <div className="text-sm text-muted-foreground">Sensitivity</div>
                      <div className="font-semibold">92.3%</div>
                    </div>
                    <div className="border rounded p-3 text-center">
                      <div className="text-sm text-muted-foreground">Specificity</div>
                      <div className="font-semibold">89.1%</div>
                    </div>
                    <div className="border rounded p-3 text-center">
                      <div className="text-sm text-muted-foreground">Latency</div>
                      <div className="font-semibold">1.2s</div>
                    </div>
                  </div>

                  {/* Patient Metadata */}
                  <div className="border rounded p-4">
                    <div className="font-semibold mb-3">Patient Information</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Age:</span>
                        <span>45 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sex:</span>
                        <span>Male</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">HIV Status:</span>
                        <span>Negative</span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Controls */}
                  <div className="border rounded p-4 space-y-3">
                    <div className="font-semibold">Clinician Feedback</div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-10 bg-green-500/20 rounded flex items-center justify-center">✓ Accept</div>
                      <div className="h-10 bg-yellow-500/20 rounded flex items-center justify-center">⚠ Override</div>
                      <div className="h-10 bg-red-500/20 rounded flex items-center justify-center">🚩 Flag</div>
                    </div>
                    <div className="h-20 bg-muted rounded">Optional feedback notes</div>
                    <div className="h-10 bg-primary/40 rounded">Submit Feedback</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Monitoring Dashboard */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">7. Monitoring Dashboard (IT/Admin Only)</h2>
          <div className="border-2 border-dashed rounded-lg p-6 bg-card">
            <div className="space-y-6">
              <div className="h-10 bg-muted rounded flex items-center px-4">Page Header: System Monitoring</div>

              {/* Metrics Cards */}
              <div className="grid md:grid-cols-4 gap-4">
                <div className="border rounded p-4">
                  <div className="text-sm text-muted-foreground">Sensitivity</div>
                  <div className="text-2xl font-bold">92.3%</div>
                  <div className="h-1 bg-green-500 rounded mt-2"></div>
                </div>
                <div className="border rounded p-4">
                  <div className="text-sm text-muted-foreground">Specificity</div>
                  <div className="text-2xl font-bold">89.1%</div>
                  <div className="h-1 bg-blue-500 rounded mt-2"></div>
                </div>
                <div className="border rounded p-4">
                  <div className="text-sm text-muted-foreground">Avg Latency</div>
                  <div className="text-2xl font-bold">1.4s</div>
                  <div className="h-1 bg-yellow-500 rounded mt-2"></div>
                </div>
                <div className="border rounded p-4">
                  <div className="text-sm text-muted-foreground">Total Predictions</div>
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="h-1 bg-purple-500 rounded mt-2"></div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded p-4">
                  <div className="font-semibold mb-3">Performance Trends (30 Days)</div>
                  <div className="h-48 bg-muted/30 rounded flex items-center justify-center">
                    Line Chart: Sensitivity/Specificity over time
                  </div>
                </div>
                <div className="border rounded p-4">
                  <div className="font-semibold mb-3">Clinician Feedback Distribution</div>
                  <div className="h-48 bg-muted/30 rounded flex items-center justify-center">
                    Pie Chart: Accepted/Override/Flagged
                  </div>
                </div>
              </div>

              {/* Fairness Analysis */}
              <div className="border rounded p-4">
                <div className="font-semibold mb-3">Fairness Analysis</div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">By Gender</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 text-sm">Male</div>
                        <div className="flex-1 h-6 bg-muted rounded"></div>
                        <div className="text-sm">45%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 text-sm">Female</div>
                        <div className="flex-1 h-6 bg-muted rounded"></div>
                        <div className="text-sm">43%</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">By Age Group</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 text-sm">18-35</div>
                        <div className="flex-1 h-6 bg-muted rounded"></div>
                        <div className="text-sm">38%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 text-sm">36-60</div>
                        <div className="flex-1 h-6 bg-muted rounded"></div>
                        <div className="text-sm">47%</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 text-sm">60+</div>
                        <div className="flex-1 h-6 bg-muted rounded"></div>
                        <div className="text-sm">42%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="border border-yellow-500/50 rounded p-4 bg-yellow-500/10">
                <div className="font-semibold mb-2">⚠ System Alerts</div>
                <div className="space-y-2 text-sm">
                  <div className="h-6 bg-muted/50 rounded">Alert 1: High flag rate detected</div>
                  <div className="h-6 bg-muted/50 rounded">Alert 2: Latency spike observed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Audit Logs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">8. Audit Logs (Admin Only)</h2>
          <div className="border-2 border-dashed rounded-lg p-6 bg-card">
            <div className="space-y-4">
              <div className="h-10 bg-muted rounded flex items-center px-4">Page Header: Audit Logs</div>

              {/* Filter Bar */}
              <div className="flex gap-4">
                <div className="h-10 flex-1 bg-muted rounded">🔍 Search</div>
                <div className="h-10 w-32 bg-muted rounded">Filter Result</div>
                <div className="h-10 w-32 bg-muted rounded">Filter Action</div>
                <div className="h-10 w-32 bg-primary/40 rounded">Export CSV</div>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="border rounded p-3 text-center">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-xl font-semibold">1,247</div>
                </div>
                <div className="border rounded p-3 text-center">
                  <div className="text-sm text-muted-foreground">Accepted</div>
                  <div className="text-xl font-semibold">892</div>
                </div>
                <div className="border rounded p-3 text-center">
                  <div className="text-sm text-muted-foreground">Overridden</div>
                  <div className="text-xl font-semibold">234</div>
                </div>
                <div className="border rounded p-3 text-center">
                  <div className="text-sm text-muted-foreground">Flagged</div>
                  <div className="text-xl font-semibold">121</div>
                </div>
              </div>

              {/* Audit Table */}
              <div className="border rounded overflow-hidden">
                <div className="bg-muted/50 p-3 font-semibold grid grid-cols-7 gap-4 text-sm">
                  <div>Timestamp</div>
                  <div>Clinician</div>
                  <div>Patient ID</div>
                  <div>AI Prediction</div>
                  <div>Confidence</div>
                  <div>Action Taken</div>
                  <div>Notes</div>
                </div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-3 border-t grid grid-cols-7 gap-4 items-center text-sm">
                    <div className="h-6 bg-muted/30 rounded"></div>
                    <div className="h-6 bg-muted/30 rounded"></div>
                    <div className="h-6 bg-muted/30 rounded"></div>
                    <div className="h-6 bg-destructive/20 rounded"></div>
                    <div className="h-6 bg-muted/30 rounded"></div>
                    <div className="h-6 bg-green-500/20 rounded"></div>
                    <div className="h-6 bg-muted/30 rounded"></div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Showing 1-10 of 1,247</div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-muted rounded">←</div>
                  <div className="h-8 w-8 bg-primary/40 rounded">1</div>
                  <div className="h-8 w-8 bg-muted rounded">2</div>
                  <div className="h-8 w-8 bg-muted rounded">3</div>
                  <div className="h-8 w-8 bg-muted rounded">→</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* User Flow Diagram */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">9. User Flow Diagram</h2>
          <div className="border-2 border-dashed rounded-lg p-6 bg-card">
            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="h-12 w-32 bg-muted rounded mx-auto">Landing Page</div>
                <div className="text-2xl">↓</div>
                <div className="h-12 w-32 bg-muted rounded mx-auto">Login/Signup</div>
                <div className="text-2xl">↓</div>
                <div className="h-12 w-32 bg-primary/40 rounded mx-auto">Email Confirm</div>
                <div className="text-2xl">↓</div>
                <div className="h-12 w-32 bg-muted rounded mx-auto">Dashboard</div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="font-semibold mb-4 text-center">Role-Based Access</div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border rounded p-4 space-y-2">
                    <div className="font-semibold text-center">Clinician</div>
                    <div className="h-8 bg-primary/20 rounded text-center flex items-center justify-center text-sm">
                      New Upload
                    </div>
                    <div className="h-8 bg-primary/20 rounded text-center flex items-center justify-center text-sm">
                      Results
                    </div>
                  </div>
                  <div className="border rounded p-4 space-y-2">
                    <div className="font-semibold text-center">IT Staff</div>
                    <div className="h-8 bg-blue-500/20 rounded text-center flex items-center justify-center text-sm">
                      New Upload
                    </div>
                    <div className="h-8 bg-blue-500/20 rounded text-center flex items-center justify-center text-sm">
                      Results
                    </div>
                    <div className="h-8 bg-blue-500/20 rounded text-center flex items-center justify-center text-sm">
                      Monitoring
                    </div>
                  </div>
                  <div className="border rounded p-4 space-y-2">
                    <div className="font-semibold text-center">Admin</div>
                    <div className="h-8 bg-green-500/20 rounded text-center flex items-center justify-center text-sm">
                      New Upload
                    </div>
                    <div className="h-8 bg-green-500/20 rounded text-center flex items-center justify-center text-sm">
                      Results
                    </div>
                    <div className="h-8 bg-green-500/20 rounded text-center flex items-center justify-center text-sm">
                      Monitoring
                    </div>
                    <div className="h-8 bg-green-500/20 rounded text-center flex items-center justify-center text-sm">
                      Audit Logs
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold border-b pb-2">10. Key Features Summary</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">Technical Features</h3>
              <ul className="space-y-1 text-sm">
                <li>✓ Supabase Authentication with email confirmation</li>
                <li>✓ Role-based access control (Clinician/IT/Admin)</li>
                <li>✓ Vercel Blob storage for X-ray images</li>
                <li>✓ Grad-CAM heatmap visualization</li>
                <li>✓ Real-time performance monitoring</li>
                <li>✓ Comprehensive audit logging</li>
                <li>✓ CSV export for regulatory compliance</li>
              </ul>
            </div>
            <div className="border rounded p-4">
              <h3 className="font-semibold mb-2">UI/UX Features</h3>
              <ul className="space-y-1 text-sm">
                <li>✓ Collapsible sidebar navigation</li>
                <li>✓ Drag-and-drop file upload</li>
                <li>✓ Interactive feedback controls</li>
                <li>✓ Real-time data visualization charts</li>
                <li>✓ Responsive design (desktop/tablet)</li>
                <li>✓ Professional medical color scheme</li>
                <li>✓ Accessible and intuitive interface</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
