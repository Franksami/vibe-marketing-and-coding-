"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export default function ConvertKitDebugPage() {
  const [loading, setLoading] = useState(false);
  const [debugData, setDebugData] = useState<any>(null);
  const [testEmail, setTestEmail] = useState("");
  const [testResult, setTestResult] = useState<any>(null);

  const runDebug = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/convertkit-debug");
      const data = await response.json();
      setDebugData(data);
    } catch (error) {
      setDebugData({ error: "Failed to fetch debug data" });
    }
    setLoading(false);
  };

  const testEmailCapture = async () => {
    if (!testEmail) return;
    
    setLoading(true);
    try {
      const response = await fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail }),
      });
      const data = await response.json();
      setTestResult({
        email: testEmail,
        success: response.ok,
        message: data.message || data.error,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setTestResult({
        email: testEmail,
        success: false,
        message: "Network error",
        timestamp: new Date().toISOString(),
      });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">ConvertKit Debug Dashboard</h1>

      {/* Quick Test Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Email Test</CardTitle>
          <CardDescription>Test the email capture endpoint directly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="test@example.com"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
            <Button onClick={testEmailCapture} disabled={loading || !testEmail}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Test"}
            </Button>
          </div>
          {testResult && (
            <div className={`mt-4 p-4 rounded-lg ${testResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
              <div className="flex items-center gap-2">
                {testResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium">{testResult.message}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Email: {testResult.email} | Time: {testResult.timestamp}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Debug Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>ConvertKit Integration Status</CardTitle>
          <CardDescription>
            Debug information for ConvertKit API integration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={runDebug} disabled={loading} className="mb-4">
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Run Debug Check
          </Button>

          {debugData && (
            <div className="space-y-4">
              {debugData.error ? (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-red-700 font-medium">Error: {debugData.error}</p>
                  {debugData.message && (
                    <p className="text-red-600 text-sm mt-1">{debugData.message}</p>
                  )}
                  {debugData.config && (
                    <div className="mt-2 text-sm">
                      <p>Config Status:</p>
                      <ul className="ml-4">
                        <li>API Key: {debugData.config.hasApiKey ? '✅' : '❌'}</li>
                        <li>API Secret: {debugData.config.hasApiSecret ? '✅' : '❌'}</li>
                        <li>Form ID: {debugData.config.hasFormId ? '✅' : '❌'}</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  {/* Form Info */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Form Information</h3>
                    <dl className="grid grid-cols-2 gap-2 text-sm">
                      <dt className="text-muted-foreground">Form ID:</dt>
                      <dd className="font-mono">{debugData.form?.id}</dd>
                      <dt className="text-muted-foreground">Form Name:</dt>
                      <dd>{debugData.form?.name}</dd>
                      <dt className="text-muted-foreground">Total Subscribers:</dt>
                      <dd>{debugData.form?.totalSubscribers}</dd>
                    </dl>
                  </div>

                  {/* Recent Subscribers */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Recent Subscribers</h3>
                    {debugData.recentSubscribers?.length > 0 ? (
                      <ul className="space-y-2 text-sm">
                        {debugData.recentSubscribers.map((sub: any, i: number) => (
                          <li key={i} className="flex justify-between">
                            <span>{sub.email}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              sub.state === 'active' ? 'bg-green-100' : 'bg-yellow-100'
                            }`}>
                              {sub.state}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No recent subscribers</p>
                    )}
                  </div>

                  {/* Test Submission Result */}
                  {debugData.testSubmission && (
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold mb-2">API Test Result</h3>
                      <p className="text-sm">
                        Test email: <code>{debugData.testSubmission.email}</code>
                      </p>
                      <p className="text-sm">
                        Status: {debugData.testSubmission.success ? '✅ Success' : '❌ Failed'}
                      </p>
                      <p className="text-sm">
                        State: {debugData.testSubmission.state || 'N/A'}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Troubleshooting Guide</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <h4>If subscribers show as "inactive":</h4>
          <ol>
            <li>Check your ConvertKit form settings for double opt-in</li>
            <li>Look in spam/promotions folder for confirmation emails</li>
            <li>Check ConvertKit → Subscribers → Unconfirmed</li>
          </ol>
          
          <h4>API Endpoints:</h4>
          <ul>
            <li>Email Capture: <code>/api/capture-email</code></li>
            <li>Debug Info: <code>/api/convertkit-debug</code></li>
          </ul>

          <h4>Vercel Logs:</h4>
          <p>Check Vercel Functions logs for [ConvertKit] tagged messages to see API calls in real-time.</p>
        </CardContent>
      </Card>
    </div>
  );
}