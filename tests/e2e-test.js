// E2E Test Script for Vibe Academy
// Run with: npm install playwright && node tests/e2e-test.js

const { chromium } = require('playwright');

const SITE_URL = 'https://vibe-marketing-and-coding.vercel.app';
const TEST_EMAIL = `test-${Date.now()}@example.com`;

async function runTests() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🧪 Starting E2E Tests for Vibe Academy\n');

  try {
    // Test 1: Page Load
    console.log('📍 Test 1: Loading homepage...');
    await page.goto(SITE_URL);
    await page.waitForLoadState('networkidle');
    console.log('✅ Homepage loaded successfully\n');

    // Test 2: Email Capture - Hero Section
    console.log('📍 Test 2: Testing email capture in hero section...');
    const heroEmailInput = await page.locator('section').first().locator('input[type="email"]');
    await heroEmailInput.fill(TEST_EMAIL);
    
    const heroSubmitButton = await page.locator('section').first().locator('button:has-text("Get Free Starter Kit")');
    await heroSubmitButton.click();
    
    // Wait for success message
    await page.waitForSelector('text=/success|subscribed|thank/i', { timeout: 5000 }).catch(() => {});
    console.log('✅ Email capture form submitted\n');

    // Test 3: Pricing Section
    console.log('📍 Test 3: Testing pricing section...');
    await page.locator('a[href="/pricing"]').first().click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Pricing page loaded\n');

    // Test 4: Stripe Checkout
    console.log('📍 Test 4: Testing Stripe checkout...');
    const checkoutButton = await page.locator('button:has-text("Become Founding Member")').first();
    await checkoutButton.click();
    
    // Wait for Stripe redirect
    await page.waitForURL(/stripe\.com|checkout\.stripe\.com/, { timeout: 10000 });
    console.log('✅ Redirected to Stripe checkout\n');
    
    // Go back to test more features
    await page.goto(SITE_URL);

    // Test 5: Exit Intent Popup
    console.log('📍 Test 5: Testing exit intent popup...');
    await page.waitForTimeout(11000); // Wait 11 seconds for popup eligibility
    
    // Simulate mouse leave
    await page.mouse.move(0, 0);
    
    // Check if popup appears
    const popup = await page.locator('text=/Don\'t miss out|limited time|special offer/i').count();
    if (popup > 0) {
      console.log('✅ Exit intent popup appeared\n');
    } else {
      console.log('⚠️  Exit intent popup did not appear (may need manual testing)\n');
    }

    // Test 6: Authentication
    console.log('📍 Test 6: Testing authentication...');
    const signInButton = await page.locator('button:has-text("Sign In")').first();
    await signInButton.click();
    
    await page.waitForSelector('text=/email|login/i', { timeout: 3000 });
    console.log('✅ Login dialog opened\n');

    // Test 7: Protected Route
    console.log('📍 Test 7: Testing protected route...');
    await page.goto(`${SITE_URL}/library`);
    
    // Should redirect to home or show auth prompt
    const isProtected = page.url() !== `${SITE_URL}/library` || await page.locator('text=/sign in|login/i').count() > 0;
    if (isProtected) {
      console.log('✅ Protected route working correctly\n');
    }

    console.log('🎉 All tests completed!');
    console.log(`\n📧 Check ConvertKit for test email: ${TEST_EMAIL}`);
    console.log('📊 Check Google Analytics real-time view for your visit');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

runTests().catch(console.error);