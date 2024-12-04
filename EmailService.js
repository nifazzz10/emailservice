const { setTimeout } = require('timers');

class EmailService {
  constructor(provider1, provider2, rateLimit = 5, maxRetries = 3, backoff = 1000) {
    this.provider1 = provider1;
    this.provider2 = provider2;
    this.rateLimit = rateLimit;
    this.retries = maxRetries;
    this.backoff = backoff;
    this.sentEmails = new Set();
    this.circuitBreaker = false;
  }

  async sendEmailWithRetry(email, provider, retriesLeft, delay) {
    if (retriesLeft === 0) {
      return { success: false, retries: this.retries, error: 'Max retries reached' };
    }

    try {
      console.log(`Attempting to send email to ${email} using ${provider}`);
      const sent = await provider.send(email);
      if (sent) {
        console.log(`Email sent successfully to ${email}`);
        return { success: true, retries: this.retries - retriesLeft };
      }
      throw new Error('Failed to send email');
    } catch (error) {
      console.log(`Error sending email to ${email}: ${error.message}. Retrying...`);
      await this.delay(delay);
      return this.sendEmailWithRetry(email, provider, retriesLeft - 1, delay * 2); // Exponential backoff
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async attemptSend(email) {
    if (this.sentEmails.has(email)) {
      console.log(`Email to ${email} is already sent (idempotent).`);
      return { success: true, retries: 0 };
    }

    this.sentEmails.add(email);
    let result;
    let retriesLeft = this.retries;
    let delay = this.backoff;

    // Try sending with the first provider
    result = await this.sendEmailWithRetry(email, this.provider1, retriesLeft, delay);

    if (result.success || this.circuitBreaker) {
      return result;
    }

    // Fallback to the second provider if the first fails
    console.log('Switching to backup provider.');
    result = await this.sendEmailWithRetry(email, this.provider2, retriesLeft, delay);

    return result;
  }

  async sendEmail(email) {
    if (this.rateLimitReached()) {
      console.log('Rate limit exceeded, delaying...');
      return { success: false, retries: 0, error: 'Rate limit exceeded' };
    }

    return this.attemptSend(email);
  }

  rateLimitReached() {
    // Simple rate limiting logic: prevent sending more than `this.rateLimit` emails per minute
    return this.sentEmails.size >= this.rateLimit;
  }

  resetCircuitBreaker() {
    this.circuitBreaker = false;
  }

  tripCircuitBreaker() {
    console.log('Circuit breaker tripped');
    this.circuitBreaker = true;
  }
}

module.exports = EmailService;
