from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework import serializers
from .models import User

#トークンを発行するためのクラス
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        return token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'user_id', 'username', 'created_at', 'updated_at')
