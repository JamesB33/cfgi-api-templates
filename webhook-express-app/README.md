# Webhook Express App

This is a simple Express application that receives webhooks and prints the payload to the console.

## Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd webhook-express-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Running the Application

To start the application, run the following command:

```
npm start
```

The application will start and listen for incoming webhook requests.

## Usage

Once the application is running, you can send a POST request to the `/webhook` endpoint with your webhook payload. The payload will be printed to the console.

## Example

You can use tools like Postman or curl to send a test webhook:

```
curl -X POST http://localhost:3000/webhook -H "Content-Type: application/json" -d '{"key": "value"}'
```

## License

This project is licensed under the MIT License.