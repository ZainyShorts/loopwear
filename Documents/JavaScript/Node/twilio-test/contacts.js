const twilio = require('twilio');

const accountSid = 'AC6a79e8a4343dc47b39e2556f0cccd353';
const authToken = '62a627ac7ed0ef2297669ba6f490bbba';
const client = twilio(accountSid, authToken);

async function fetchAllConversations() {
  try {
    const conversations = await client.conversations.conversations.list();

    conversations.forEach(conversation => {
        // console.log(conversation)
      console.log(`Conversation SID: ${conversation.sid}, Friendly Name: ${conversation.friendlyName}`);
    });
  } catch (error) {
    console.error('Error fetching conversations:', error.message);
  }
}

fetchAllConversations();
