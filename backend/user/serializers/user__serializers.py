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

        def get_followers_count(self, obj):
            return obj.followers.count()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("E-mail ou senha inválidos.")

        if not user.check_password(password):
            raise serializers.ValidationError("E-mail ou senha inválidos.")

        data['user'] = user
        return data

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['full_name', 'password', 'username']
        extra_kwargs = {
            'username': {'required': False, 'allow_blank': True},
            'full_name': {'required': False, 'allow_blank': True},
            'password': {'required': False, 'allow_blank': True}
        }

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            if value is not None and str(value).strip() != "":
                setattr(instance, attr, value)

        if password and str(password).strip() != "" and not password.startswith('pbkdf2_'):
            instance.set_password(password)

        instance.save()
        return instance