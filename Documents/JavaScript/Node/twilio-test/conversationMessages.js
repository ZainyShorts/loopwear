// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC6a79e8a4343dc47b39e2556f0cccd353';
const authToken = '62a627ac7ed0ef2297669ba6f490bbba';
const client = twilio(accountSid, authToken);

async function fetchConversationMessage() {
  const message = await client.conversations.v1
    .conversations("CHc8a4cd14d01346938847dde48016b545")
    .messages("IM6a8ed41dbe674a7fbdeeeb81c0bc8e70")
    .fetch();

  console.log(message);
}

fetchConversationMessage();