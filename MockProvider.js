class MockProvider {
    constructor(id) {
      this.id = id;
    }
  
    async send(email) {
      const randomSuccess = Math.random() > 0.5; // Random success/failure for demo purposes
      console.log(`Provider ${this.id} sending email: ${email}`);
      return randomSuccess;
    }
  }
  
  module.exports = MockProvider;
  