// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC6a79e8a4343dc47b39e2556f0cccd353';
const authToken = '62a627ac7ed0ef2297669ba6f490bbba';
const client = twilio(accountSid, authToken);

async function createConversationParticipant() {
  const participant = await client.conversations.v1
    .conversations("CH47f7c58537064f39a8572e17c7951152")
    .participants.create({ identity: "testPineapple" });

  console.log(participant.sid);
  console.log(participant);
}

createConversationParticipant();


// sid:MB9c2c4cfadd66463ebbb26767acf59188