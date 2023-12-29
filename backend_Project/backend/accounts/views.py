from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
# Create your views here.
from .serializers import MyTokenObtainPairSerializer #追加
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import action

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
            serializer = UserSerializer(request.user)
            return Response(serializer.data)    
        else:
            # 仮にid=1のユーザーを返す
            serializer = UserSerializer(User.objects.get(id=1))
            return Response(serializer.data)