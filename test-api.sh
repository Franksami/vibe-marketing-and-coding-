#!/bin/bash

echo "Testing ConvertKit API..."
echo ""

# Test email
EMAIL="test-$(date +%s)@example.com"
echo "Testing with email: $EMAIL"
echo ""

# Direct API test
echo "1. Testing direct ConvertKit API..."
curl -X POST https://api.convertkit.com/v3/forms/8307309/subscribe \
  -H "Content-Type: application/json" \
  -d "{\"api_key\":\"0aQcMavurNBy-9SixN9m1g\", \"email\":\"$EMAIL\"}" \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "2. Testing our deployed API..."
curl -X POST https://vibe-marketing-and-coding.vercel.app/api/capture-email \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\"}" \
  -w "\nHTTP Status: %{http_code}\n"

echo ""
echo "Done! Check ConvertKit dashboard for: $EMAIL"