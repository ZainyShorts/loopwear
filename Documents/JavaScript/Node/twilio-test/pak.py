# Twilio account credentials (replace with your own)
account_sid = "AC6a79e8a4343dc47b39e2556f0cccd353"
auth_token = "af098fe36c5ba2b5677bab8f86ff5d3a"

# Twilio phone number (your Twilio number)
twilio_number = "+972559531160"

# Recipient phone number
recipient_number = "+923364569588"

# Import libraries
from twilio.rest import Client

# Create a Twilio client
client = Client(account_sid, auth_token)

try:
  # Make the call
  call = client.calls.create(
      url='http://twiml.sandbox.twilio.com/start-and-stop?TwiML=http://twiml.sandbox.twilio.com/duration/1',  # TwiML to play audio for 1 minute
      to=recipient_number,
      from_=twilio_number
  )

  # Print the call sid (unique identifier for the call)
  print(f"Call sid: {call.sid}")

except Twilio. exceptions.TwilioRestException as e:
  # Print error message if call fails
  print(f"Error making call: {e}")
