const EmailService = require('./EmailService');
const MockProvider = require('./MockProvider');

const mockProvider1 = new MockProvider('Provider1');
const mockProvider2 = new MockProvider('Provider2');
const emailService = new EmailService(mockProvider1, mockProvider2);

test('Retry logic works with exponential backoff', async () => {
  const email = 'test@example.com';

  // Mocking the send method of the first provider:
  // The first call will fail, the second will succeed
  jest.spyOn(mockProvider1, 'send')
    .mockResolvedValueOnce(false)  // First call fails
    .mockResolvedValueOnce(true);  // Second call succeeds

  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});  // Mock console.log

  // Call the sendEmail method and wait for it to finish
  const status = await emailService.sendEmail(email);
  
  // The email should be sent successfully after the retry
  expect(status.success).toBe(true);
  expect(status.retries).toBe(1);  // Should retry once

  // Ensure that the log function was called during retries
  expect(logSpy).toHaveBeenCalledWith('Error sending email to test@example.com: Failed to send email. Retrying...');
  
  // Restore the original `console.log`
  logSpy.mockRestore();
});
