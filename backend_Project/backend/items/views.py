from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ItemSerializer, OwnedItemSerializer
from .models import Item, OwnedItem
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
from rest_framework.decorators import action

class ItemViewSet(viewsets.ModelViewSet):
    permission_classes = ()
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

        
class OwnedItemViewSet(viewsets.ModelViewSet):
    permission_classes = ()
    serializer_class = OwnedItemSerializer
    queryset = OwnedItem.objects.all()

    def get_queryset(self):
        return OwnedItem.objects.filter(user=self.request.user)

    # def create(self, request):
    #     serializer = OwnedItemSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(user=request.user)
    #         return Response(serializer.data, status=HTTP_201_CREATED)
    #     else:
    #         return Response(status=HTTP_400_BAD_REQUEST)