from rest_framework_simplejwt.serializers import TokenObtainPairSerializer #追加

#トークンを発行するためのクラス
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        return token
