from rest_framework import viewsets
from ..models.user__models import User
from ..serializers.user__serializers import UserSerializer
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

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_401_UNAUTHORIZED)

        if user.check_password(password):
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        
        return Response({'error': 'E-mail ou senha inválidos.'}, status=status.HTTP_401_UNAUTHORIZED)
    
