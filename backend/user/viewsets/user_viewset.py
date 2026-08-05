from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Count
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated

from ..models.user__models import User
from ..serializers.user__serializers import (
    UserSerializer, 
    UserProfileSerializer, 
    UserUpdateSerializer
)
from ..utils.auth import CustomJWTAuthentication


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            data = {
                'user': UserSerializer(user).data
            }

            response = Response(data, status=status.HTTP_200_OK)

            response.set_cookie(
                key='access',
                value=access_token,
                httponly=True,
                secure=False,    # Mudar para True em produção (HTTPS)
                samesite='Lax',
                path='/',
            )

            return response
        
        return Response({'error': 'E-mail ou senha inválidos.'}, status=status.HTTP_401_UNAUTHORIZED)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_serializer_class(self):
        if self.action in ['update', 'partial_update', 'update_profile']:
            return UserUpdateSerializer
        return UserProfileSerializer
    
    def get_queryset(self):
        return User.objects.all().annotate(followers_count=Count('followers'))

    @action(detail=False, methods=['patch'], permission_classes=[IsAuthenticated], authentication_classes=[CustomJWTAuthentication])
    def update_profile(self, request):
        try:
            user = request.user
            serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        
            if serializer.is_valid():
                serializer.save()
                updated_profile = UserProfileSerializer(user, context={'request': request})
                return Response(updated_profile.data, status=status.HTTP_200_OK)
            
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated], authentication_classes=[CustomJWTAuthentication])
    def follow(self, request, pk=None):
        target_user = self.get_object()
        current_user = request.user

        if current_user == target_user:
            return Response(
                {"error": "Você não pode seguir a si mesmo."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        if current_user.following.filter(id=target_user.id).exists():
            current_user.following.remove(target_user)
            return Response({"status": "Deixou de seguir"}, status=status.HTTP_200_OK)
        else:
            current_user.following.add(target_user)
            return Response({"status": "Seguindo com sucesso"}, status=status.HTTP_200_OK)