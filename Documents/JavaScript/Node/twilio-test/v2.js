const WebSocket = require("ws");
const express = require("express");
const fs = require("fs");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "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", // Replace with your actual API key
});

const app = express();
const PORT = 4000;

// Create WebSocket Server
const wss = new WebSocket.Server({ port: 4001 });

wss.on("connection", async (ws) => {
  console.log("Client connected");

  try {
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: "Hello Zain, what are you doing today? Welcome to AIMS app. Goodbye!",
      stream: true,
      response_format: "opus"
    });

    const reader = response.body.getReader();
    const outputStream = fs.createWriteStream("test.mp3");

    async function processStream() {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        outputStream.write(value); // Write to file
        ws.send(value); // Send binary audio chunk to WebSocket clients
      }

      outputStream.end();
      console.log("Audio streaming complete.");
      ws.close();
    }

    processStream();
  } catch (error) {
    console.error("Error streaming audio:", error);
    ws.close();
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
