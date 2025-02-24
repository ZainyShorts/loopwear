const twilio = require('twilio');

// Replace these with your actual credentials
const accountSid = 'AC6a79e8a4343dc47b39e2556f0cccd353';
const authToken = '62a627ac7ed0ef2297669ba6f490bbba';
const client = twilio(accountSid, authToken);

// Replace this with the Conversation SID you want to fetch
const conversationSid = 'CH47f7c58537064f39a8572e17c7951152';

async function fetchChatHistory() {
  try {
    const messages = await client.conversations
      .conversations(conversationSid)
      .messages
      .list();

    // Loop through and log each message
    messages.forEach((message) => {
        console.log(message)
      // console.log(`From: ${message.author}, Message: ${message.body}, Date: ${message.dateCreated}`);
    });
  } catch (error) {
    console.error('Error fetching chat history:', error.message);
  }
}

fetchChatHistory();
