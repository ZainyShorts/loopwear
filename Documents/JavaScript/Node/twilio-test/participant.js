const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

const accountSid = 'AC6a79e8a4343dc47b39e2556f0cccd353';
const authToken = '62a627ac7ed0ef2297669ba6f490bbba';
const client = twilio(accountSid, authToken);

async function createConversationParticipant() {
  const participant = await client.conversations.v1
    .conversations("CH47f7c58537064f39a8572e17c7951152")
    .participants.create({
      "messagingBinding.address": "+923396456958",
      "messagingBinding.proxyAddress": "+18603162097",
    });

  console.log(participant);
}

createConversationParticipant();


// token 
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2ZmMGI2OTRmMDg4ZTU1MDk3NTg0MGEyM2E3YmVmM2I5LTE3MzI1MzY2ODYiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJ0ZXN0UGluZWFwcGxlIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFgifX0sImlhdCI6MTczMjUzNjY4NiwiZXhwIjoxNzMyNTQwMjg2LCJpc3MiOiJTS2ZmMGI2OTRmMDg4ZTU1MDk3NTg0MGEyM2E3YmVmM2I5Iiwic3ViIjoiQUM2YTc5ZThhNDM0M2RjNDdiMzllMjU1NmYwY2NjZDM1MyJ9.vflMsp0ZT_WZmYarFwfdxv7b7Fj8lryAky8-5fK7NaI

// MBb635d01deb6d4f37b0bb639ebe17d57e