from rest_framework import viewsets, status, permissions
from ..models.user__models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from ..serializers.user__serializers import UserSerializer, UserProfileSerializer, UserUpdateSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Count
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated


@method_decorator(csrf_exempt, name='dispatch')
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

            data = {
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            }

            response = Response(data, status=status.HTTP_200_OK)

            response.set_cookie(
                key='refresh_token',
                value=str(refresh),
                httponly=True,
                secure=True,
                samesite='Lax',
                path='/'
            )
            
            return Response(data, status=status.HTTP_200_OK)
        
        return Response({'error': 'E-mail ou senha inválidos.'}, status=status.HTTP_401_UNAUTHORIZED)
    

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    
    def get_queryset(self):
        return User.objects.all().annotate(followers_count=Count('followers'))

    @action(detail=True, methods=['post'])
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

class UserProfileUpdateView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request):
        serializer = UserUpdateSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            user_atualizado = serializer.save() 
        
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        full_name = validated_data.pop('full_name', None)
        username = validated_data.pop('username', None)

        if full_name:
            names = full_name.strip().split(' ', 1)
            instance.first_name = names[0]
            instance.last_name = names[1] if len(names) > 1 else ''

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance