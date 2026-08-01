# core/serializers.py
from rest_framework import serializers
from ..models.user__models import User
from .post__serializers import PostSerializer

class UserSerializer(serializers.ModelSerializer):
    posts = PostSerializer(source='users_posts', many=True, read_only=True)
    following = serializers.SlugRelatedField(many=True, read_only=True, slug_field='username')
    followers = serializers.SlugRelatedField(many=True, read_only=True, slug_field='username')

    class Meta:
        model = User
        fields = [
            'id', 'full_name', 'username', 'email', 'posts', 'password', 
            'followers', 'following' 
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def get_followers_count(self, obj):
        return obj.followers.count()

class UserProfileSerializer(serializers.ModelSerializer):
    posts = PostSerializer(source='users_posts', many=True, read_only=True)
    followers_count = serializers.IntegerField(source='followers.count', read_only=True)
    following_count = serializers.IntegerField(source='following.count', read_only=True)

    followers = serializers.SlugRelatedField(
        many=True, 
        read_only=True, 
        slug_field='username'
    )
    
    following = serializers.SlugRelatedField(
        many=True, 
        read_only=True, 
        slug_field='username'
    )

    class Meta:
        model = User
        fields = [
            'id', 'full_name', 'username', 'email', 'posts', 'password', 
            'followers_count', 'following_count', 'followers', 'following' 
        ]
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

   