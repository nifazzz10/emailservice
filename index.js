const EmailService = require('./EmailService');
const MockProvider = require('./MockProvider');

// Create mock providers (you can add more if needed)
const mockProvider1 = new MockProvider('Provider1');
const mockProvider2 = new MockProvider('Provider2');

// Create an instance of EmailService
const emailService = new EmailService(mockProvider1, mockProvider2);

// Send a test email
async function sendTestEmail() {
  const email = 'test@example.com';
  
  // Call the sendEmail method directly
  const status = await emailService.sendEmail(email);
  
  // Output the result to the console
  console.log('Email send status:', status);
}

// Run the test email function
sendTestEmail();
