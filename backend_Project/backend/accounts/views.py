from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from rest_framework.status import  HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
# Create your views here.
from .serializers import MyTokenObtainPairSerializer #追加
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action
from items.models import Item, OwnedItem
from items.serializers import ItemSerializer, OwnedItemSerializer

#追加
class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = ()
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=False, methods=['get'], permission_classes=())
    def me(self, request):
        if request.user.is_authenticated:
            serializer = UserSerializer(request.user, many=False)
            return Response(serializer.data)    
        else:
            user = User.objects.get(id=1)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
            # return Response(status=HTTP_401_UNAUTHORIZED)
        
    @action(detail=True, methods=['get'], permission_classes=())
    def items(self, request, pk=None):
        if pk=="me": # pkがmeの場合はリクエストユーザーを取得
            user = request.user
        else:
            user = self.get_object()

        items = OwnedItem.objects.filter(user=user)
        serializer = OwnedItemSerializer(items, many=True)
        return Response(serializer.data)