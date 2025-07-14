// Quick test script for email capture API
// Run with: node test-email.js

const testEmail = async () => {
  const testEmails = [
    'test@example.com',
    'invalid-email', // Should fail validation
  ];

  console.log('🧪 Testing email capture API...\n');

  for (const email of testEmails) {
    console.log(`Testing with email: ${email}`);
    
    try {
      const response = await fetch('http://localhost:3000/api/capture-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Success:', data.message);
      } else {
        console.log('❌ Error:', data.error);
      }
    } catch (error) {
      console.log('❌ Network error:', error.message);
    }
    
    console.log('---\n');
  }
  
  console.log('💡 Tip: Check your .env.local file if emails are not being added to ConvertKit.');
  console.log('💡 Required: CONVERTKIT_API_KEY, CONVERTKIT_API_SECRET, and CONVERTKIT_FORM_ID');
  console.log('💡 Without these, emails will be logged but not added to ConvertKit.');
};

// Check if server is running
fetch('http://localhost:3000')
  .then(() => {
    console.log('✅ Server is running\n');
    testEmail();
  })
  .catch(() => {
    console.log('❌ Server is not running. Start it with: npm run dev');
  });