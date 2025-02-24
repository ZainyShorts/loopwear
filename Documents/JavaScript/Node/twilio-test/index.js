const twilio = require('twilio');

// Replace these with your actual Account SID and Auth Token
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = new twilio(accountSid, authToken);

// Replace with your Twilio number and the Israeli number you want to call
const fromNumber = 'your_twilio_number';
const toNumber = 'israeli_number';

client.calls
  .create({
    url: 'http://demo.twilio.com/docs/voice.xml', // Twilio demo URL for testing
    to: toNumber,
    from: fromNumber
  })
  .then((call) => {
    console.log(`Call SID: ${call.sid}`);
    console.log('Calling...');

    // Check call status after 1 minute
    setTimeout(() => {
      client.calls(call.sid)
        .fetch()
        .then((updatedCall) => {
          console.log(`Call Status: ${updatedCall.status}`);
          console.log(`Call Duration: ${updatedCall.duration} seconds`);
          console.log(`Call Price: ${updatedCall.price} ${updatedCall.priceUnit}`);
        })
        .catch((error) => {
          console.error('Error fetching call details:', error);
        });
    }, 60000); // 60000 milliseconds = 1 minute
  })
  .catch((error) => {
    console.error('Error making the call:', error);
  });
