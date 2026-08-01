from rest_framework import viewsets, status
from ..models.user__models import User
from ..serializers.user__serializers import UserSerializer, UserProfileSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Count

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
