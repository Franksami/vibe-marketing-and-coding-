"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface APITestResult {
  endpoint: string;
  success: boolean;
  status?: number;
  data?: {
    message?: string;
    error?: string;
    [key: string]: unknown;
  };
  timestamp?: string;
  error?: string;
}

interface DirectTestResult {
  success: boolean;
  error?: string;
  tests?: {
    formSubscription: {
      success: boolean;
      status: number;
      data: Record<string, unknown>;
    };
    subscriberLookup: {
      found: boolean;
      count: number;
    };
  };
  summary?: {
    subscriberId?: string;
    state: string;
    email: string;
  };
}

interface FormsData {
  error?: string;
  currentFormId?: string;
  forms?: Array<{
    id: number;
    name: string;
    type: string;
    format: string;
  }>;
}


export default function TestConvertKitPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<APITestResult | null>(null);
  const [forms, setForms] = useState<FormsData | null>(null);
  const [directTest, setDirectTest] = useState<DirectTestResult | null>(null);

  const testOurEndpoint = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/capture-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setResults({
        endpoint: "Our API",
        success: response.ok,
        status: response.status,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      setResults({
        endpoint: "Our API",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
    setLoading(false);
  };

  const testDirectAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/convertkit-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setDirectTest(data);
    } catch (error) {
      setDirectTest({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
    setLoading(false);
  };

  const fetchForms = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/convertkit-test");
      const data = await response.json();
      setForms(data);
    } catch {
      setForms({ error: "Failed to fetch forms" });
    }
    setLoading(false);
  };

  const testWithCurl = () => {
    const curlCommand = `curl -X POST https://api.convertkit.com/v3/forms/8307309/subscribe \\
  -H "Content-Type: application/json" \\
  -d '{"api_key":"0aQcMavurNBy-9SixN9m1g", "email":"${email || 'test@example.com'}"}'`;
    
    navigator.clipboard.writeText(curlCommand);
  };

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">ConvertKit Comprehensive Test</h1>

      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This page tests ConvertKit integration in multiple ways to identify where the issue is.
        </AlertDescription>
      </Alert>

      {/* Email Input */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Email</CardTitle>
          <CardDescription>Enter an email to test with all methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={testOurEndpoint} disabled={loading || !email}>
              Test Our API
            </Button>
            <Button onClick={testDirectAPI} disabled={loading || !email} variant="secondary">
              Test Direct API
            </Button>
            <Button onClick={fetchForms} disabled={loading} variant="outline">
              List Forms
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="results" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="results">Our API Results</TabsTrigger>
          <TabsTrigger value="direct">Direct API Test</TabsTrigger>
          <TabsTrigger value="forms">Available Forms</TabsTrigger>
          <TabsTrigger value="manual">Manual Tests</TabsTrigger>
        </TabsList>

        {/* Our API Results */}
        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Our API Endpoint Results</CardTitle>
              <CardDescription>/api/capture-email</CardDescription>
            </CardHeader>
            <CardContent>
              {results ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${results.success ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {results.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      )}
                      <span className="font-medium">
                        {results.success ? 'Success' : 'Failed'} - Status {results.status}
                      </span>
                    </div>
                    {results.data && (
                      <pre className="text-xs overflow-auto bg-white p-2 rounded">
                        {JSON.stringify(results.data, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No test results yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Direct API Test */}
        <TabsContent value="direct">
          <Card>
            <CardHeader>
              <CardTitle>Direct ConvertKit API Tests</CardTitle>
              <CardDescription>Multiple endpoints tested directly</CardDescription>
            </CardHeader>
            <CardContent>
              {directTest ? (
                <div className="space-y-4">
                  {directTest.tests && (
                    <>
                      {/* Form Subscription Test */}
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Form Subscription</h3>
                        <div className={`text-sm ${directTest.tests.formSubscription.success ? 'text-green-600' : 'text-red-600'}`}>
                          Status: {directTest.tests.formSubscription.status}
                        </div>
                        <pre className="text-xs mt-2 overflow-auto bg-gray-50 p-2 rounded">
                          {JSON.stringify(directTest.tests.formSubscription.data, null, 2)}
                        </pre>
                      </div>

                      {/* Subscriber Lookup */}
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Subscriber Lookup</h3>
                        <div className="text-sm">
                          Found: {directTest.tests.subscriberLookup.found ? 'Yes' : 'No'} 
                          ({directTest.tests.subscriberLookup.count} total)
                        </div>
                      </div>

                      {/* Summary */}
                      {directTest.summary && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <h3 className="font-medium mb-2">Summary</h3>
                          <dl className="grid grid-cols-2 gap-2 text-sm">
                            <dt>Subscriber ID:</dt>
                            <dd className="font-mono">{directTest.summary.subscriberId || 'N/A'}</dd>
                            <dt>State:</dt>
                            <dd>{directTest.summary.state}</dd>
                            <dt>Email:</dt>
                            <dd>{directTest.summary.email}</dd>
                          </dl>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No direct test results yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forms List */}
        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>ConvertKit Forms</CardTitle>
              <CardDescription>All forms in your account</CardDescription>
            </CardHeader>
            <CardContent>
              {forms ? (
                <div className="space-y-4">
                  <Alert>
                    <AlertDescription>
                      Current Form ID in .env: <code>{forms.currentFormId}</code>
                    </AlertDescription>
                  </Alert>
                  {forms.forms?.map((form) => (
                    <div key={form.id} className={`p-4 border rounded-lg ${form.id.toString() === forms.currentFormId ? 'border-primary bg-primary/5' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{form.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ID: {form.id} | Type: {form.type} | Format: {form.format}
                          </p>
                        </div>
                        {form.id.toString() === forms.currentFormId && (
                          <Badge>Current</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  {forms.forms?.length === 0 && (
                    <p className="text-muted-foreground">No forms found</p>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">Click &quot;List Forms&quot; to see available forms</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Manual Tests */}
        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Manual Testing Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">1. Test with cURL</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Copy this command and run in terminal:
                </p>
                <Button onClick={testWithCurl} variant="outline" size="sm">
                  Copy cURL Command
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">2. Check Vercel Logs</h3>
                <p className="text-sm text-muted-foreground">
                  Look for [ConvertKit] messages in your Vercel Function logs
                </p>
                <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm">Open Vercel Dashboard</Button>
                </a>
              </div>

              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">3. ConvertKit Dashboard</h3>
                <p className="text-sm text-muted-foreground mb-2">Check these locations:</p>
                <ul className="text-sm list-disc list-inside space-y-1">
                  <li>Subscribers → All (not just Active)</li>
                  <li>Subscribers → Unconfirmed</li>
                  <li>Forms → Your Form → Reports</li>
                  <li>Account → API → Logs</li>
                </ul>
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>If nothing works:</strong> Consider duplicating your form in ConvertKit as ChatGPT suggested. Sometimes forms can have internal issues.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}