// Gumroad Integration Test Script
// Run with: npx ts-node tests/gumroad-integration.test.ts

import { gumroad } from '../src/lib/gumroad';
import type { GumroadWebhookEvent } from '../src/types/gumroad';

console.log('🧪 Gumroad Integration Test Suite\n');

// Test 1: License Key Generation
console.log('Test 1: License Key Generation');
const testKey = gumroad.generateLicenseKey('test-product', 'test-purchase');
console.log('Generated key:', testKey);
console.log('Valid format:', gumroad.validateLicenseKeyFormat(testKey));
console.log('✅ License key generation test passed\n');

// Test 2: License Key Validation
console.log('Test 2: License Key Validation');
const validKeys = [
  'VIBE-LM3K8P2N-A1B2C3D4E5F6G7H8-12AB34CD',
  'VIBE-XXXXXXXX-1234567890ABCDEF-ABCDEF12',
];
const invalidKeys = [
  'INVALID-KEY',
  'VIBE-SHORT-KEY',
  'vibe-lowercase-key',
  '',
];

validKeys.forEach(key => {
  console.log(`✓ Valid key: ${key} - ${gumroad.validateLicenseKeyFormat(key)}`);
});

invalidKeys.forEach(key => {
  console.log(`✗ Invalid key: ${key} - ${gumroad.validateLicenseKeyFormat(key)}`);
});
console.log('✅ License key validation test passed\n');

// Test 3: Webhook Event Parsing
console.log('Test 3: Webhook Event Parsing');
const mockWebhookData = {
  seller_id: '1234567890',
  product_id: 'prod_abc123',
  product_name: 'Vibe Marketing Kit',
  permalink: 'vibekit',
  product_permalink: 'marketing-kit',
  email: 'test@example.com',
  price: '$0',
  gumroad_fee: '$0',
  currency: 'USD',
  quantity: '1',
  discover_fee_charged: 'false',
  can_contact: 'true',
  referrer: 'https://vibeacademy.com',
  order_number: '12345',
  sale_id: 'sale_abc123',
  sale_timestamp: '2025-01-14T12:00:00Z',
  purchaser_id: 'purch_123',
  license_key: 'GUMROAD-LICENSE-KEY',
  ip_country: 'US',
  test: 'true',
};

const parsedEvent = gumroad.parseWebhookEvent(mockWebhookData);
console.log('Parsed event:', {
  productId: parsedEvent.product_id,
  email: parsedEvent.email,
  saleId: parsedEvent.sale_id,
  isTest: parsedEvent.test === 'true',
});
console.log('✅ Webhook parsing test passed\n');

// Test 4: Price Formatting
console.log('Test 4: Price Formatting');
import { formatGumroadPrice } from '../src/lib/gumroad';

const prices = [0, 900, 2700, 9700, 29700];
prices.forEach(cents => {
  console.log(`${cents} cents = ${formatGumroadPrice(cents)}`);
});
console.log('✅ Price formatting test passed\n');

// Test 5: Product URL Generation
console.log('Test 5: Product URL Generation');
import { getProductUrl } from '../src/lib/gumroad';

const permalinks = ['marketing-kit', 'cursor-rules', 'ui-kit'];
permalinks.forEach(permalink => {
  console.log(`${permalink} → ${getProductUrl(permalink)}`);
});
console.log('✅ Product URL generation test passed\n');

// Test 6: Mock Webhook Request
console.log('Test 6: Mock Webhook Request');
console.log('To test the webhook endpoint:');
console.log('1. Start the dev server: npm run dev');
console.log('2. Use ngrok to expose local server: ngrok http 3000');
console.log('3. Update Gumroad webhook URL to ngrok URL');
console.log('4. Make a test purchase in Gumroad');
console.log('5. Check server logs for webhook data\n');

// Test 7: Environment Variables Check
console.log('Test 7: Environment Variables Check');
const requiredEnvVars = [
  'GUMROAD_ACCESS_TOKEN',
  'GUMROAD_WEBHOOK_SECRET',
  'NEXT_PUBLIC_GUMROAD_STORE_URL',
];

let allEnvVarsSet = true;
requiredEnvVars.forEach(varName => {
  const isSet = !!process.env[varName];
  console.log(`${isSet ? '✓' : '✗'} ${varName}: ${isSet ? 'Set' : 'Not set'}`);
  if (!isSet) allEnvVarsSet = false;
});

if (allEnvVarsSet) {
  console.log('✅ All environment variables are set\n');
} else {
  console.log('⚠️  Some environment variables are missing. Add them to .env.local\n');
}

console.log('🎉 All tests completed!');
console.log('\nNext steps:');
console.log('1. Set up Gumroad account and create products');
console.log('2. Configure environment variables');
console.log('3. Test webhook with real Gumroad purchase');
console.log('4. Monitor webhook logs for successful integration');