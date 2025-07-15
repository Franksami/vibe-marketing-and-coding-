// Test authentication endpoints
// Run with: node test-auth.js

const testAuth = async () => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing Authentication System...\n');

  // Test 1: Sign up new user
  console.log('1. Testing signup...');
  try {
    const signupRes = await fetch(`${baseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@thevibelaunch.ai',
        password: 'testpassword123',
        name: 'Test User'
      })
    });
    
    const signupData = await signupRes.json();
    
    if (signupRes.ok) {
      console.log('✅ Signup successful:', signupData.message);
    } else {
      console.log('❌ Signup failed:', signupData.error);
    }
  } catch (error) {
    console.log('❌ Signup error:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 2: Try duplicate signup
  console.log('2. Testing duplicate signup prevention...');
  try {
    const dupRes = await fetch(`${baseUrl}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@thevibelaunch.ai',
        password: 'anotherpassword',
        name: 'Duplicate User'
      })
    });
    
    const dupData = await dupRes.json();
    
    if (!dupRes.ok && dupData.error === 'User already exists') {
      console.log('✅ Correctly prevented duplicate signup');
    } else {
      console.log('❌ Duplicate prevention failed');
    }
  } catch (error) {
    console.log('❌ Duplicate test error:', error.message);
  }
  
  console.log('\n---\n');
  
  // Test 3: Magic link
  console.log('3. Testing magic link...');
  try {
    const magicRes = await fetch(`${baseUrl}/api/auth/magic-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'magic@thevibelaunch.ai'
      })
    });
    
    const magicData = await magicRes.json();
    
    if (magicRes.ok) {
      console.log('✅ Magic link sent:', magicData.message);
      if (magicData.magicLink) {
        console.log('📧 Dev magic link:', magicData.magicLink);
      }
    } else {
      console.log('❌ Magic link failed:', magicData.error);
    }
  } catch (error) {
    console.log('❌ Magic link error:', error.message);
  }
  
  console.log('\n---\n');
  
  console.log('💡 To test login:');
  console.log('1. Go to http://localhost:3000');
  console.log('2. Click "Sign In"');
  console.log('3. Use email: test@thevibelaunch.ai');
  console.log('4. Use password: testpassword123');
  console.log('\n💡 Database location: prisma/dev.db');
};

// Check if server is running
fetch('http://localhost:3000')
  .then(() => {
    console.log('✅ Server is running\n');
    // Give server a moment to fully initialize
    setTimeout(testAuth, 1000);
  })
  .catch(() => {
    console.log('❌ Server is not running. Start it with: npm run dev');
  });