# core/serializers.py
from rest_framework import serializers
from ..models.user__models import User
from .post__serializers import PostSerializer

class UserSerializer(serializers.ModelSerializer):
    posts = PostSerializer(source='users_posts', many=True, read_only=True)
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email', 'username', 'password', 'posts']
        extra_kwargs = {'password': {'write_only': True}}

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = User.objects.filter(email=email).first()
        user = User.objects.get(email=email)
        
        if user.check_password(password):
            print("Password matches")
        
        raise serializers.ValidationError("E-mail ou senha inválidos.")

   