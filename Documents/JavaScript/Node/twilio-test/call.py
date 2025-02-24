# from twilio.rest import Client

# account_sid = 'AC6a79e8a4343dc47b39e2556f0cccd353'
# auth_token = 'af098fe36c5ba2b5677bab8f86ff5d3a'
# client = Client(account_sid, auth_token)

# from_number = '+972559531160'
# to_number = '+923174668133'

# call = client.calls.create(
#     url='http://demo.twilio.com/docs/voice.xml',  
#     to=to_number,
#     from_=from_number,
#     time_limit=60,
# ) 

# print(f"Call SID: {call.sid}")
# print('Calling...')


# call = client.calls(call.sid).fetch()
# print(f"Call Status: {call.status}")
# print(f"Call Duration: {call.duration} seconds")
# print(f"Call Price: {call.price} {call.price_unit}")


from twilio.rest import Client
import time

account_sid = 'AC6a79e8a4343dc47b39e2556f0cccd353'
auth_token = 'af098fe36c5ba2b5677bab8f86ff5d3a'
client = Client(account_sid, auth_token)

from_number = '+972559531160'
to_number = '+923265941991'

call = client.calls.create(
    url='http://demo.twilio.com/docs/voice.xml',  
    to=to_number,
    from_=from_number,
    time_limit=25,
) 

print(f"Call SID: {call.sid}")
print('Calling...')

# Polling to wait until the call status changes to 'completed'
while True:
    call = client.calls(call.sid).fetch()
    if call.status in ['completed','no-answer', 'canceled']:
        break
    print(f"Current call status: {call.status}")
    time.sleep(5)  # Wait for 5 seconds before checking the status again

print(f"Call Status: {call.status}")
print(f"Call Duration: {call.duration} seconds")
print(f"Call Price: {call.price} {call.price_unit}")
