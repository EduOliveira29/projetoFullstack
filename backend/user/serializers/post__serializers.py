from rest_framework import serializers
from ..models.post__models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    total_likes = serializers.ReadOnlyField() 
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Post
        fields = [
            'id', 'slug', 'author_name', 'content', 
            'created_on', 'status', 'total_likes'
        ]
        read_only_fields = ['author', 'created_on', 'updated_on', 'total_likes']

class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_name', 'body', 'created_on']
        read_only_fields = ['author', 'created_on']