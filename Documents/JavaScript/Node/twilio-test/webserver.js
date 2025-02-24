 // if (!headerSent) {
    //   header = Buffer.concat([header, chunk]);
    //   if (header.length >= 44) { // Standard WAV header is 44 bytes
    //     ws.send(header.slice(0, 44));
    //     headerSent = true;
    //     if (header.length > 44) {
    //       ws.send(header.slice(44));
    //     }
    //   }
    // } else {
      // ws.send(chunk);
    // }

// // worked but not perfeect beacuse of headeers 
// const { OpenAI } = require('openai');
// const express = require("express");
// const WebSocket = require("ws");

// const openai = new OpenAI({
//   apiKey: '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',
// });

// const app = express();
// const PORT = 4000;

// // Create WebSocket Server
// const wss = new WebSocket.Server({ port: 4001 });

// wss.on("connection", async (ws) => {
//   console.log("Client connected");

//   const response = await openai.audio.speech.create({
//     model: 'tts-1',
//     voice: 'alloy',
//     input: 'Hello zain what are you doing today thanks for coming welcome to aims app good bye',
//     response_format: "mp3"
//   });

//   let stream = response.body;

//   stream.on('data', chunk => {
//       ws.send(chunk);
//   });

//   stream.on('end', () => {
//     console.log('Audio streaming complete.');
//     ws.close();
//   });

//   stream.on('error', (error) => {
//     console.error('Error streaming audio:', error);
//     ws.close();
//   });
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// adding headers of mp3
//----------------------------
const { OpenAI } = require('openai');
const express = require("express");
const WebSocket = require("ws");

const openai = new OpenAI({
  apiKey: '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',
});

const app = express();
const PORT = 4000;

// Create WebSocket Server
const wss = new WebSocket.Server({ port: 4001 });

wss.on("connection", async (ws) => {
  console.log("Client connected");
  
  try {
    const response = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'alloy',
      input: 'Hello Zain, what are you doing today? Thanks for coming. Welcome to AIMS app. Goodbye!',
      response_format: "mp3"
    });

    let stream = response.body;
    
    ws.send(Buffer.from([0x49, 0x44, 0x33])); // Send MP3 ID3 header for correct playback

    stream.on('data', chunk => {
      ws.send(chunk, { binary: true });
    });

    stream.on('end', () => {
      console.log('Audio streaming complete.');
      ws.close();
    });

    stream.on('error', (error) => {
      console.error('Error streaming audio:', error);
      ws.close();
    });

  } catch (error) {
    console.error("Error generating speech:", error);
    ws.close();
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//-----------------------------


// 80% done 
// adding headers 
// const { OpenAI } = require('openai');
// const express = require("express");
// const WebSocket = require("ws");
// const { spawn } = require('child_process');

// const openai = new OpenAI({
//   apiKey: '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',
// });

// const app = express();
// const PORT = 4000;

// // Create WebSocket Server
// const wss = new WebSocket.Server({ port: 4001 });

// wss.on("connection", async (ws) => {
//   console.log("Client connected");

//   const response = await openai.audio.speech.create({
//     model: 'tts-1',
//     voice: 'alloy',
//     input: 'Hello zain what are you doing today thanks for coming welcome to aims app good bye',
//     response_format: "wav"
//   });

//   let stream = response.body;

//   // Set up ffmpeg command to convert WAV to MP3
//   const ffmpeg = spawn('ffmpeg', [
//     '-i', 'pipe:0',
//     '-acodec', 'libmp3lame',
//     '-b:a', '128k',
//     '-f', 'mp3',
//     'pipe:1'
//   ]);

//   // Pipe the WAV stream to ffmpeg
//   stream.pipe(ffmpeg.stdin);

//   // Send the MP3 stream to the client
//   ffmpeg.stdout.on('data', (chunk) => {
//     ws.send(chunk);
//   });

//   ffmpeg.stderr.on('data', (data) => {
//     console.error(`ffmpeg stderr: ${data}`);
//   });

//   ffmpeg.on('close', (code) => {
//     console.log(`ffmpeg process exited with code ${code}`);
//     ws.close();
//   });

//   ws.on('close', () => {
//     ffmpeg.kill();
//   });
// });

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));