from rest_framework import viewsets
from ..models.user__models import User
from ..serializers.user__serializers import UserSerializer

class UserDetailView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'pk'

class UserDetailView(viewsets.ModelViewSet):
    queryset = User.objects.prefetch_related('users_posts').all()
    serializer_class = UserSerializer