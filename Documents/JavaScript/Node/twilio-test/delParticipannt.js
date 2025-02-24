

const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

const accountSid = 'AC6a79e8a4343dc47b39e2556f0cccd353';
const authToken = '62a627ac7ed0ef2297669ba6f490bbba';
const client = twilio(accountSid, authToken);

async function deleteConversation() {
  await client.conversations.v1
    .conversations("CH3a9da833d3ec46318497aa7d22172c70")
    .remove();
}

deleteConversation();