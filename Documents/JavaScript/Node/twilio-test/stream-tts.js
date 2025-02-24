const fs = require('fs');
const { OpenAI } = require('openai');  // Import OpenAI SDK

const openai = new OpenAI({
  apiKey: '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',  // Replace with your actual API key
});

async function streamAudio() {
  const response = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy',
    input: 'Hello world! This is a streaming test.',
    stream: true,  // Enable streaming mode
  });

  // Create a write stream to save the output to a file
  const outputStream = fs.createWriteStream('output.mp3');

   let stream = response.body

  // Listen for chunks and write them to the file
  stream.on('data', chunk => {
    console.log(chunk)
    outputStream.write(chunk);
  });

  // When the stream ends, close the file
  stream.on('end', () => {
    outputStream.end();
    console.log('Audio streaming complete.');
  });

  // Handle any errors
  stream.on('error', (error) => {
    console.error('Error streaming audio:', error);
  });
}

streamAudio();
