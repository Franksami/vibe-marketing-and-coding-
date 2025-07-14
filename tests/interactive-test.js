// Interactive Test Script for Vibe Academy
// Run with: node tests/interactive-test.js

const { chromium } = require('playwright');

const SITE_URL = 'https://vibe-marketing-and-coding.vercel.app';
const TEST_EMAIL = `test-${Date.now()}@example.com`;

async function runTests() {
  const browser = await chromium.launch({ 
    headless: false, // Show browser window
    slowMo: 1000 // Slow down actions so we can see them
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('🧪 Starting Interactive Tests for Vibe Academy\n');
  console.log('👀 Watch the browser window to see the tests in action!\n');

  try {
    // Test 1: Page Load
    console.log('📍 Test 1: Loading homepage...');
    await page.goto(SITE_URL);
    await page.waitForLoadState('networkidle');
    console.log('✅ Homepage loaded successfully\n');
    await page.waitForTimeout(2000);

    // Test 2: Email Capture - Hero Section
    console.log('📍 Test 2: Testing email capture in hero section...');
    console.log(`📧 Using test email: ${TEST_EMAIL}`);
    
    const heroEmailInput = await page.locator('section').first().locator('input[type="email"]');
    await heroEmailInput.fill(TEST_EMAIL);
    
    const heroSubmitButton = await page.locator('section').first().locator('button:has-text("Get Free Starter Kit")');
    await heroSubmitButton.click();
    
    // Wait for response
    await page.waitForTimeout(3000);
    
    // Check for success or error message
    const messages = await page.locator('p').filter({ hasText: /success|error|thank|subscribed/i }).allTextContents();
    if (messages.length > 0) {
      console.log(`📩 Response: ${messages[0]}`);
    }
    console.log('✅ Email capture test completed\n');

    // Test 3: Navigate to Pricing
    console.log('📍 Test 3: Navigating to pricing page...');
    await page.locator('a[href="/pricing"]').first().click();
    await page.waitForLoadState('networkidle');
    console.log('✅ Pricing page loaded\n');
    await page.waitForTimeout(2000);

    // Test 4: Check Authentication State
    console.log('📍 Test 4: Checking if user is logged in...');
    const signInButton = await page.locator('button:has-text("Sign In")').count();
    if (signInButton > 0) {
      console.log('⚠️  User is not logged in - Stripe checkout requires authentication');
      console.log('   The "Become Founding Member" button will prompt login first\n');
    } else {
      console.log('✅ User is logged in\n');
    }

    // Test 5: Test Stripe Checkout Button
    console.log('📍 Test 5: Testing Stripe checkout button...');
    const checkoutButton = await page.locator('button:has-text("Become Founding Member")').first();
    
    if (await checkoutButton.isVisible()) {
      console.log('🔍 Found checkout button - clicking...');
      await checkoutButton.click();
      
      // Wait to see what happens
      await page.waitForTimeout(5000);
      
      // Check if we're on Stripe
      if (page.url().includes('stripe.com')) {
        console.log('✅ Successfully redirected to Stripe checkout!');
        console.log(`🔗 Stripe URL: ${page.url()}\n`);
      } else if (page.url().includes('/api/auth/signin')) {
        console.log('🔐 Redirected to login page (authentication required)');
        console.log('   You need to be logged in to access checkout\n');
      } else {
        console.log(`📍 Current URL: ${page.url()}`);
        console.log('   Check browser window for any error messages\n');
      }
    }

    console.log('🎉 Interactive tests completed!');
    console.log('\n📋 Summary:');
    console.log(`- Test email used: ${TEST_EMAIL}`);
    console.log('- Check your ConvertKit dashboard for the new subscriber');
    console.log('- Check browser window for current state');
    console.log('\nPress Ctrl+C to close the browser when done exploring.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
  
  // Keep browser open for manual exploration
  await page.waitForTimeout(300000); // Wait 5 minutes
}

runTests().catch(console.error);