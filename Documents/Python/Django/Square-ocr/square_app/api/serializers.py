from rest_framework import serializers
from .models import UploadDoc

class UploadDocSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadDoc
        fields = ["id","title"]