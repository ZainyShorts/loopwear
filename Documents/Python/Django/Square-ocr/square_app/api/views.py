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

url = "https://connect.squareup.com/v2/catalog/object"

headers = {
    "Square-Version": "2024-09-19",  # Use the appropriate version
    "Authorization": "Bearer EAAAllPBdsgxkpTU7sbPWyiT_DmXjZrb5BTVPWyb5cItr6VL44Yh21yxumDQJ9M-",
    "Content-Type": "application/json"
}


# Initialize Square client
client = Client(
    access_token='EAAAllPBdsgxkpTU7sbPWyiT_DmXjZrb5BTVPWyb5cItr6VL44Yh21yxumDQJ9M-',
    environment='production'
)



cloudinary.config( 
  cloud_name = "dlasb4krd", 
  api_key = "486585293283911", 
  api_secret = "tLUDKjvJk-r_Xn1Dt7v3OSlIyK0" 
)

client = OpenAI(api_key="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")

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
            return Response({'success': True,'mssg':data['message']})

class GPTException(Exception):
    """Custom exception for GPT-related errors."""
    def __init__(self, status, message):
        self.status = status
        self.message = message
        super().__init__(self.message)

def textExtraction(titles,url):
    try:
        response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text": f"""
                    return list with dictionary
                    titles
                    {', '.join(titles)}
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
        list = response.choices[0].message.content

        start = list.find('[')

        end = list.find(']', start) + 1

        items_list = list[start:end]

        items_list = eval(items_list)

        return  {
            "status": True,
            "items_list": items_list
        }
    except Exception as e:
        raise GPTException(status=False, message=str(e))
    
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

def variationObj(name,desc,amount):
    return {
                    "type": "ITEM_VARIATION",
                    "id": f"#{name}",  
                    "item_variation_data": {
                        "name": name + f"({desc})",
                        "pricing_type": "FIXED_PRICING",
                        "price_money": {
                        "amount": int(amount),
                        "currency": "PKR"
                        },
                        "track_inventory": True,
                        "sellable": True,
                        "stockable": True,
                        # "inventory": {
                        # "quantity": 10
                        # }
                    }
    }

def getLocationId():
    try:
        url = "https://connect.squareup.com/v2/locations"  # Make sure to set the correct API endpoint
        headers = {
                "Square-Version": "2023-09-19",  # Use the appropriate Square version
                "Authorization": "Bearer EAAAllPBdsgxkpTU7sbPWyiT_DmXjZrb5BTVPWyb5cItr6VL44Yh21yxumDQJ9M-",  # Replace with your Square access token
                "Content-Type": "application/json"
        }
        result = requests.get(url, headers=headers)

        return  result['locations'][0]['id']
    except Exception:
        return '0' 

def updateVariationStock(stock,obId,uuid):
    try:
        url = "https://connect.squareup.com/v2/inventory/batch-change"  # Make sure to set the correct API endpoint
        headers = {
            "Square-Version": "2023-09-19",  # Use the appropriate Square version
            "Authorization": "Bearer EAAAllPBdsgxkpTU7sbPWyiT_DmXjZrb5BTVPWyb5cItr6VL44Yh21yxumDQJ9M-",  # Replace with your Square access token
            "Content-Type": "application/json"
        }
        locationId = getLocationId()
        if locationId == '0':
            return False
        payload = json.dumps({
            "idempotency_key": idempotency_key(),
            "changes": [
                {
                "type": "ADJUSTMENT",
                "adjustment": {
                    "catalog_object_id": obId,  
                    "quantity": str(stock),
                    "from_state": "NONE",
                    "to_state": "IN_STOCK",
                    "location_id":locationId,
                    "occurred_at": "2024-10-06T12:00:00Z" 
                }}
              ]}
            )

        result = requests.post(url, headers=headers, data=payload)
        if result.status_code == 200:
            return True
        else:
            return False
    except Exception:
        return False

@api_view(['POST'])
def squareMethod(request):

        url = "https://connect.squareup.com/v2/catalog/object"  # Make sure to set the correct API endpoint
        headers = {
            "Square-Version": "2023-09-19",  # Use the appropriate Square version
            "Authorization": "Bearer EAAAllPBdsgxkpTU7sbPWyiT_DmXjZrb5BTVPWyb5cItr6VL44Yh21yxumDQJ9M-",  # Replace with your Square access token
            "Content-Type": "application/json"
        }

        body = request.data
        json_List = json.loads(body['jsonList'])
        catName = request.data['name']
        catDesc = request.data['description']
        
        variation_list = []

        for jsonObject in json_List:
                name = jsonObject.get('Item')  
                desc = jsonObject.get('Description') 
                amount = jsonObject.get('Unit Price') 
                
                variation_list.append(variationObj(name, desc, amount))
        
       
            
        try:
            payload = json.dumps({
                "idempotency_key": idempotency_key,
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
            if result.status_code == 200:
                 return Response({'success': True,'result':result})
            else:
                return Response({'success': False})
        except Exception:
            return Response({'success': False,})


@api_view(['GET'])
def squareMethodTest(request):
        url = "https://connect.squareup.com/v2/catalog/object"  # Make sure to set the correct API endpoint
        headers = {
            "Square-Version": "2023-10-01",  # Use the appropriate Square version
            "Authorization": "Bearer EAAAllPBdsgxkpTU7sbPWyiT_DmXjZrb5BTVPWyb5cItr6VL44Yh21yxumDQJ9M-",  # Replace with your Square access token
            "Content-Type": "application/json"
        }

        try:
            payload = json.dumps({
                "idempotency_key": "0388234d-1f72-8518-b6d5-3887162233909",
                "object": {
                    "type": "ITEM",
                    "id": "#HABASH",
                    "item_data": {
                        "name": "Sandwich",
                        "description": "Delicious sandwich",
                        "abbreviation": "SW",
                        "label_color": "fef65b",
                        "available_online": True,
                        "variations": [
                            {
                                "type": "ITEM_VARIATION",
                                "id": "#largeSandwich",
                                "item_variation_data": {
                                    "name": "Large Sandwich",
                                    "pricing_type": "FIXED_PRICING",
                                    "price_money": {
                                        "amount": 1500,
                                        "currency": "PKR"
                                    },
                                    "track_inventory": True,
                                    "sellable": True,
                                    "stockable": True,
                                    "inventory": {
                                        "quantity": 10
                                    }
                                }
                            },
                            {
                                "type": "ITEM_VARIATION",
                                "id": "#smallSandwich",
                                "item_variation_data": {
                                    "name": "Small Sandwich",
                                    "pricing_type": "FIXED_PRICING",
                                    "price_money": {
                                        "amount": 800,
                                        "currency": "PKR"
                                    },
                                    "track_inventory": True,
                                    "sellable": True,
                                    "stockable": True,
                                    "inventory": {
                                        "quantity": 15
                                    }
                                }
                            },
                            {
                                "type": "ITEM_VARIATION",
                                "id": "#mediumSandwich",
                                "item_variation_data": {
                                    "name": "Medium Sandwich",
                                    "pricing_type": "FIXED_PRICING",
                                    "price_money": {
                                        "amount": 1200,
                                        "currency": "PKR"
                                    },
                                    "track_inventory": True,
                                    "sellable": True,
                                    "stockable": True,
                                    "inventory": {
                                        "quantity": 12
                                    }
                                }
                            }
                        ]
                    }
                }
            })

            response = requests.post(url, headers=headers, data=payload)

            if response.status_code == 200:
                return Response({'success': True, 'data': response.json()})
            else:
                return Response({'success': False, 'error': response.text}, status=response.status_code)
        except Exception as e:
            return Response({'success': False, 'error': str(e)}, status=500)