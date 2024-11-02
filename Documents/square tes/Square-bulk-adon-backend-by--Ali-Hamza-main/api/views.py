from django.shortcuts import render
from rest_framework import generics
from openai import OpenAI
import cloudinary
from cloudinary import uploader 
from pdf2image import convert_from_path
import os
from django.http import FileResponse
from square.client import Client
import json
import requests
import uuid
from datetime import datetime,timezone
from dotenv import load_dotenv
import logging

logging.basicConfig(
    level=logging.INFO,  # Set the logging level to INFO
    format='%(asctime)s - %(levelname)s - %(message)s'  # Format for log messages
)

load_dotenv()

url = "https://connect.squareup.com/v2/catalog/object"

headers = {
    "Square-Version": os.getenv("SQUARE_VERSION"),  # Use the appropriate version
    "Authorization": f"Bearer {os.getenv('SQUARE_ACCESS_TOKEN')}",
    "Content-Type": "application/json"
}

FILE_PATH = '../users.json'

client = Client(
    access_token=os.getenv('SQUARE_ACCESS_TOKEN'),
    environment='production'
)

cloudinary.config( 
  cloud_name = os.getenv('CLOUDINARY_CLOUD_NAME'), 
  api_key = os.getenv('CLOUDINARY_API_KEY'), 
  api_secret = os.getenv('CLOUDINARY_API_SECRET')
)

try:
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
except:
    logging.warning("Set openai key in the env file please.")

from .models import UploadDoc
from .serializers import UploadDocSerializer

class SquareOcListCrreate(generics.ListCreateAPIView):
     queryset = UploadDoc.objects.all()
     serializer_class = UploadDocSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET', 'POST'])
def item_list_create(request):
    if request.method == 'GET':
        return Response({'success': True, 'msg': 'Get Route'})

    if request.method == 'POST':
        body = request.data
        titles = body['titles']
        url = body['url']
        data = textExtraction(titles,url)
        if(data['status'] == True):
            return Response({'success': True,'data':data['items_list']})
        else:
            return Response({'success': True,'mssg':data['error']})

class GPTException(Exception):
    """Custom exception for GPT-related errors."""
    def __init__(self, status, error):
        self.status = status
        self.error = error
        super().__init__(self.error)

def textExtraction(titles,url):
    try:
        response = client.chat.completions.create(
        model="gpt-4o-mini",
        errors=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text": f"""
                    return list with dictionary
                    titles
                    {', '.join(titles)}. If something is null or empty put 0 there but do not leave box empty 
                    """},
                {
                "type": "image_url",
                "image_url": {
                    "url": url,
                },
                },
            ],
            }
        ],
        )
        list = response.choices[0].error.content

        start = list.find('[')

        end = list.find(']', start) + 1

        items_list = list[start:end]

        items_list = eval(items_list)

        return  {
            "status": True,
            "items_list": items_list
        }
    except Exception as e:
        raise GPTException(status=False, error=str(e))
    
@api_view(['DELETE'])
def delete_image_view(request, public_id):
    try:
        uploader.destroy(public_id)
        return Response({'success': True , 'msg': 'Image deleted',})
    except Exception as e:
        return Response({'success': False, 'msg': str(e)})
    
@api_view(['POST'])
def pdf_convert_jpg(request):
    try:
        if 'pdf_file' not in request.FILES:
            return Response({'success': False, 'msg': 'No file provided'}, status=400)

        uploaded_file = request.FILES['pdf_file']

        pdf_path = os.path.join(os.getcwd(), uploaded_file.name)
        with open(pdf_path, 'wb+') as temp_file:
            for chunk in uploaded_file.chunks():
                temp_file.write(chunk)

        images = convert_from_path(pdf_path, dpi=300, first_page=1, last_page=1)

        output_path = os.path.join(os.getcwd(), 'output_image.jpg')
        images[0].save(output_path, 'JPEG')

        image_file = open(output_path, 'rb')
        response = FileResponse(image_file, content_type='image/jpeg')
        response['Content-Disposition'] = f'attachment; filename="converted_image.jpg"'

        return response

    except Exception as e:
        print(f"Error: {e}")
        return Response({'success': False, 'msg': f"Error: {str(e)}"})
    
    finally:
        if pdf_path and os.path.exists(pdf_path):
            os.remove(pdf_path)
        if output_path and os.path.exists(output_path):
            os.remove(output_path)

def idempotency_key():
    return str(uuid.uuid4())

def variationObj(index,name,desc,amount,currency):
    return {
                    "type": "ITEM_VARIATION",
                    "id": f"#{name}"+str(index),  
                    "item_variation_data": {
                        "name": name + f"({desc})",
                        "pricing_type": "FIXED_PRICING",
                        "price_money": {
                        "amount": int(amount * 100) ,
                        "currency": currency
                        },
                        "track_inventory": True,
                        "sellable": True,
                        "stockable": True,
                    }
    }

def getLocationId():
    try:
        url = "https://connect.squareup.com/v2/locations"  # Make sure to set the correct API endpoint
        result = requests.get(url, headers=headers)
        data = result.json()
        return  data['locations'][0]['id']
    except Exception:
        return '0' 

def occurred_at():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

def updateVariationStock(variation_ids,stocks):
    try:
        updateVariationwithStock = []
        for index, varId in enumerate(variation_ids):
            updateVariationwithStock.append(stockUpdate(stocks[index],varId))
        
        
        url = "https://connect.squareup.com/v2/inventory/batch-change"  # Make sure to set the correct API endpoint
        locationId = getLocationId()
        if locationId == '0':
            return False
        payload = json.dumps({
            "idempotency_key": idempotency_key(),
            "changes": updateVariationwithStock
              }
            )

        result = requests.post(url, headers=headers, data=payload)
        if result.status_code == 200:
            return True
        else:
            return False
    except Exception:
        return False

def stockUpdate(stock,objId):
    return {
      "type": "ADJUSTMENT",
      "adjustment": {
        "catalog_object_id": objId,  
        "quantity": str(stock),
        "from_state": "NONE",
        "to_state": "IN_STOCK",
        "location_id":getLocationId(),
        "occurred_at": occurred_at()
        }
    }

def getCurrency():
    try:
        url = "https://connect.squareup.com/v2/locations"  # Make sure to set the correct API endpoint
        result = requests.get(url, headers=headers)
        data = result.json()
        return  data['locations'][0]['currency']
    except Exception:
        return 'USD' 

def duplication(list,title):
    Filterlist = list
    item_names = {}

# Iterate through the items to check for duplicates
    try:
       for item in Filterlist:
        item_name = item[title]
        if item_name in item_names:
            item_names[item_name] += '1'
        else:
            item_names[item_name] = '1'
        
        return Filterlist
    except Exception:
        return list

def stringFilter(val):
    try:
        return int(float(val.split()[0]))
    except Exception:
        return val

@api_view(['POST'])
def squareMethod(request):

        url = "https://connect.squareup.com/v2/catalog/object"  # Make sure to set the correct API endpoint
        json_List = json.loads(request.data['jsonList'])
        catName = request.data['name']
        catDesc = request.data['description']
        tempName = request.data['tempName']
        
        variation_list = []
        stocks = []
        currency = getCurrency()

        for index,jsonObject in enumerate(json_List):
                if tempName == 'HABASH':
                    name = jsonObject.get('Item')  
                    desc = jsonObject.get('Description') 
                    amount = jsonObject.get('Unit Price') 
                    stk = jsonObject.get('Quantity') 
                elif tempName == 'SOURIANA':
                    name = jsonObject.get('Item Code') 
                    desc = jsonObject.get('Description') 
                    amount = jsonObject.get('Unit Price') 
                    stk = jsonObject.get('Quantity')
                elif tempName == 'UBC':
                    name = jsonObject.get('Product')
                    desc = jsonObject.get('Description') 
                    amount = jsonObject.get('Unit Price')
                    stk = stringFilter(jsonObject.get('Qty'))
                elif tempName == 'PRESTIGE':
                    name = jsonObject.get('SKU')
                    desc = jsonObject.get('Description') 
                    amount = jsonObject.get('Rate')
                    stk = jsonObject.get('Qty Ordered')
                    
                variation_list.append(variationObj(index,name, desc, amount,currency))
                stocks.append(stk)

            
        try:
            payload = json.dumps({
                "idempotency_key": idempotency_key(),
                "object": {
                    "type": "ITEM",  
                    "id": f"#{catName}",  
                    "item_data": {  
                    "name": catName,
                    "description": catDesc,
                    "available_online": True,
                    "variations": variation_list
                    }
                }
                })

            result = requests.post(url, headers=headers, data=payload)
            responseData = result.json()
            if result.status_code == 200:
                 variation_ids = [variation['id'] for variation in responseData['catalog_object']['item_data']['variations']]
                 updateVariationStock(variation_ids,stocks)
                 return Response({'success': True,'result':result})
            else:
                return Response({'success': False})
        except Exception:
            return Response({'success': False,})

@api_view(['GET'])
def checkKeys(request):
    SQUARE_ACCESS_TOKEN = os.getenv("SQUARE_ACCESS_TOKEN")
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
    CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY")
    CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET")  
    SQUARE_VERSION = os.getenv("SQUARE_VERSION")
    if not SQUARE_ACCESS_TOKEN:
        return Response({'success': False,'error':"Set your Square access token in the env file of django"})
    if not OPENAI_API_KEY:
        return Response({'success': False,'error':"Set your Openai key  in the env file of django"})
    if not CLOUDINARY_CLOUD_NAME:
        return Response({'success': False,'error':"Set your cloudinary cloudname in the env file of django"})
    if not CLOUDINARY_API_KEY:
        return Response({'success': False,'error':"Set your cloudinary apikey in the env file of django"})
    if not CLOUDINARY_API_SECRET:    
        return Response({'success': False,'error':"Set your cloudinary api secret in the env file of django"})
    if not SQUARE_VERSION:    
        return Response({'success': False,'error':"Set your cloudinary api secret in the env file of django"})
    return Response({'success': True,})

def pathCheck():
    if not os.path.exists(FILE_PATH):
        with open(FILE_PATH, 'w') as file:
            json.dump([], file) 

@api_view(['POST'])
def createUser(request):
    # Extract the user details from the request
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate required fields
    if not name:
        return Response({'success': False, 'error': "Enter name"})
    if not email:
        return Response({'success': False, 'error': "Enter email"})
    if not password:
        return Response({'success': False, 'error': "Enter password"})

    # Read the existing users from the file
    users_list = read_users_from_file()

    # Check if a user with the given email already exists
    for user in users_list:
        if user['email'] == email:
            return Response({'success': False, 'error': "User with this email already exists"})

    # Create a new user object
    new_user = {
        'name': name,
        'email': email,
        'password': password
    }
    users_list.append(new_user)  # Add the new user to the list

    # Write the updated list of users back to the file
    write_users_to_file(users_list)

    # Return a success response
    return Response({'success': True, 'message': "User created successfully", 'user': new_user})
    
def read_users_from_file():
    """Read users from a JSON file."""
    pathCheck()
    if os.path.exists(FILE_PATH):
        with open(FILE_PATH, 'r') as file:
            try:
                return json.load(file)
            except json.JSONDecodeError:
                return []  # If the file is empty or not a valid JSON, return an empty list
    else:
        return []

def write_users_to_file(users):
    """Write users to a JSON file."""
    pathCheck()
    with open(FILE_PATH, 'w') as file:
        json.dump(users, file, indent=4)

@api_view(['POST'])
def loginUser(request):
    # Extract email and password from the request
    email = request.data.get('email')
    password = request.data.get('password')

    # Validate required fields
    if not email:
        return Response({'success': False, 'error': "Enter email"})
    if not password:
        return Response({'success': False, 'error': "Enter password"})

    # Read the existing users from the file
    users_list = read_users_from_file()

    # Check if the user with the given email and password exists
    for user in users_list:
        if user['email'] == email and user['password'] == password:
            return Response({'success': True, 'message': "Login successful", 'user': user})

    # If no match found, return error response
    return Response({'success': False, 'error': "Invalid email or password"})
