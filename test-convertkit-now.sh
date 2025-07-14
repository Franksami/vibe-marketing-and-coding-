#!/bin/bash

echo "=== ConvertKit Direct API Test ==="
echo ""

# Generate unique email
EMAIL="test-$(date +%s)@example.com"
echo "Testing with email: $EMAIL"
echo ""

# Test ConvertKit API directly
echo "Calling ConvertKit API..."
curl -X POST https://api.convertkit.com/v3/forms/8307309/subscribe \
  -H "Content-Type: application/json" \
  -d "{\"api_key\":\"0aQcMavurNBy-9SixN9m1g\", \"email\":\"$EMAIL\"}" \
  -w "\n\nHTTP Status: %{http_code}\n"

echo ""
echo "=== IMPORTANT ==="
echo "Now check your ConvertKit dashboard:"
echo "1. Go to https://app.convertkit.com"
echo "2. Click Subscribers → All Subscribers"
echo "3. Look for: $EMAIL"
echo ""
echo "Also check:"
echo "- Subscribers → Unconfirmed (if using double opt-in)"
echo "- Forms → Your Form → Reports"
echo ""