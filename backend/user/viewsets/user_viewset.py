from rest_framework import viewsets
from ..models.models import User
from ..serializers.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        print(f"Tentando login com: {email} / {password}") # Veja no terminal se chega certo

        try:
            user = User.objects.get(email=email)
            print(f"Usuário encontrado no banco: {user.email}, Senha salva no banco: {user.password}")
        except User.DoesNotExist:
            return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):
            return Response({'message': 'Sucesso!'}, status=status.HTTP_200_OK)
        
        return Response({'error': 'E-mail ou senha inválidos.'}, status=status.HTTP_401_UNAUTHORIZED)
    
