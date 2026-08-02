from rest_framework import serializers
from ..models.user__models import User
from .post__serializers import PostSerializer

class UserSerializer(serializers.ModelSerializer):
    posts = PostSerializer(source='users_posts', many=True, read_only=True)
    following = serializers.SlugRelatedField(many=True, read_only=True, slug_field='username')
    followers = serializers.SlugRelatedField(many=True, read_only=True, slug_field='username')
    profile_picture = serializers.ReadOnlyField(source='profile_picture_url')
    cover_image = serializers.ReadOnlyField(source='cover_image_url')

    class Meta:
        model = User
        fields = [
            'id', 'full_name', 'username', 'email', 'posts', 'password', 
            'followers', 'following' , 'profile_picture', 'cover_image'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def get_followers_count(self, obj):
        return obj.followers.count()

class UserProfileSerializer(serializers.ModelSerializer):
    posts = PostSerializer(source='users_posts', many=True, read_only=True)
    followers_count = serializers.IntegerField(source='followers.count', read_only=True)
    following_count = serializers.IntegerField(source='following.count', read_only=True)
    profile_picture_url = serializers.ReadOnlyField()
    cover_image_url = serializers.ReadOnlyField()

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
            'id', 
            'full_name', 
            'username', 
            'email', 
            'password', 
            'posts', 
            'followers_count', 
            'following_count', 
            'followers', 
            'following', 
            'profile_picture',
            'cover_image', 
            'profile_picture_url', 
            'cover_image_url'  
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

class UserUpdateSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.ReadOnlyField()
    cover_image_url = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            'id', 
            'username',
            'full_name',
            'password',
            'profile_picture',
            'cover_image',  
            'profile_picture_url',  
            'cover_image_url'
        ]
        extra_kwargs = {
            'profile_picture': {'write_only': True, 'required': False},
            'cover_image': {'write_only': True, 'required': False},
            'username': {'required': False},
            'full_name': {'required': False},
            'password': {
                'write_only': True,
                'required': False,
                'style': {'input_type': 'password'}
            }
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance

