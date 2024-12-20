# Resilient Email Sending Service

This is a **resilient email sending service** built using **JavaScript (Node.js)**. It incorporates several key features to ensure reliable email delivery, including:

- **Retry logic with exponential backoff**: Retries failed email sends with increasing delays.
- **Fallback mechanism**: If the first email provider fails, the service automatically falls back to a second provider.
- **Idempotency**: Prevents duplicate emails from being sent by checking if the email has already been sent.
- **Rate limiting**: Limits the number of emails sent to avoid overloading the email providers.
- **Status tracking**: Tracks the success or failure of each email attempt.

This project is a demonstration of building a resilient system for email delivery that handles failures gracefully, ensuring high availability and reliability.

## Features
- Retry mechanism with exponential backoff
- Fallback between multiple email providers
- Idempotency to prevent sending duplicate emails
- Rate limiting to avoid overloading the provider
- Status tracking of email sending attempts
- Circuit breaker to temporarily halt email sending after consecutive failures
- Simple logging for debugging and monitoring

## Demo & Introduction Video
IT IS INSIDE THE REPO IT SELF PLEASE CHECK IT OUT
## Setup Instructions

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (version 12 or above): You can download it from [Node.js official website](https://nodejs.org/).
- **npm** (Node Package Manager): It comes with Node.js, but you can check its version by running `npm -v`.

### Installation

1. **Clone the repository** to your local machine:

    ```bash
    git clone https://github.com/nifazzz10/emailservice
    cd emailservice
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Run the service**:
    You can run the email service directly by running the following command:

    ```bash
    node index.js
    ```

    This will simulate sending an email. The service will automatically attempt retries if it fails to send the email initially, and will fall back to the second provider if needed.

4. **Run Tests**:
    To run the unit tests using Jest:

    ```bash
    npm test
    ```

    This will execute all test cases and ensure everything is working as expected.

---


## Key Concepts and Architecture

1. **EmailService**: This is the main class responsible for sending emails. It handles retries, fallback, rate limiting, and logging.
2. **MockProvider**: A mock email provider used to simulate the behavior of real email providers (e.g., SendGrid, SES). It randomly succeeds or fails to test the retry logic.
3. **Retry Logic**: If the email fails to send, the system will retry sending it after a delay. The delay increases exponentially with each failure.
4. **Rate Limiting**: The system ensures that a maximum number of emails are sent within a defined period to avoid spamming the email provider.
5. **Idempotency**: The system checks if an email has already been sent, ensuring the same email isn't sent multiple times.
6. **Fallback Mechanism**: If the first email provider fails, the system will automatically try the second provider to ensure the email is sent.

---

## Contributing

Feel free to fork the repository, open issues, or make pull requests if you'd like to contribute to the project. I'd appreciate your feedback and contributions!




---

**Thank you for checking out this project!**

