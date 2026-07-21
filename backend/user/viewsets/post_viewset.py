from rest_framework import generics
from ..models.user__models import User
from ..serializers.user__serializers import UserSerializer

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.prefetch_related('users_posts').all()
    serializer_class = UserSerializer