// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC6a79e8a4343dc47b39e2556f0cccd353';
const authToken = '62a627ac7ed0ef2297669ba6f490bbba';
const client = twilio(accountSid, authToken);

async function createConversationParticipant() {
  const participant = await client.conversations.v1
    .conversations("CH576af59ec7294840923852b74118c2e7")
    .participants.create({
      "messagingBinding.address": "whatsapp:YOUR_WHATSAPP_NUMBER",
      "messagingBinding.proxyAddress": "whatsapp:TWI_WA_NUMBER",
    });

  console.log(participant.accountSid);
}

createConversationParticipant();