// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC6a79e8a4343dc47b39e2556f0cccd353';
const authToken = '62a627ac7ed0ef2297669ba6f490bbba';
const client = twilio(accountSid, authToken);

async function fetchConversation() {
  const conversation = await client.conversations.v1
    .conversations("CH47f7c58537064f39a8572e17c7951152")
    .fetch();

  console.log(conversation);
}

fetchConversation();

// IS939e875bbc9a4db2b3b7c316adfe6ab0

// twilio token:chat --identity testPineapple --chat-service-sid IS939e875bbc9a4db2b3b7c316adfe6ab0 --profile zainy8426