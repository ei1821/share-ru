from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ItemSerializer, OwnedItemSerializer
from .models import Item, OwnedItem
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR

class ItemViewSet(viewsets.ModelViewSet):
    permission_classes = ()
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def create(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)
        
class OwnedItemViewSet(viewsets.ModelViewSet):
    permission_classes = ()
    serializer_class = OwnedItemSerializer
    queryset = OwnedItem.objects.all()

    def create(self, request):
        serializer = OwnedItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(status=HTTP_400_BAD_REQUEST)