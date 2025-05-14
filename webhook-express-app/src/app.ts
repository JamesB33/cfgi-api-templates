import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());

let lastWebhookData: any = null;
let clients: express.Response[] = [];

// ...existing code...

app.get("/api/webHook/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  // Send the last data if available
  if (lastWebhookData) {
    res.write(`data: ${JSON.stringify(lastWebhookData)}\n\n`);
  }

  clients.push(res);

  // Heartbeat to keep connection alive
  const heartbeat = setInterval(() => {
    res.write(": heartbeat\n\n");
  }, 15000); // every 15 seconds

  req.on("close", () => {
    clearInterval(heartbeat);
    clients = clients.filter((client) => client !== res);
  });
});

// ...existing code...

app.post("/api/webHook", (req, res) => {
  lastWebhookData = req.body;
  console.log("Received webhook:", req.body);

  // Push data to all connected SSE clients
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(req.body)}\n\n`);
  });

  res.status(200).send("Webhook received");
});

app.get("/api/webHook", (req, res) => {
  if (lastWebhookData) {
    res.status(200).json(lastWebhookData);
  } else {
    res.status(404).send("No webhook data received yet.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
