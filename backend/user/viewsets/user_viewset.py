# core/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models.models import User
from ..serializers.serializers import UserSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import login

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            # O 'user' foi injetado no validated_data pelo método validate do serializer
            login(request, serializer.validated_data['user'])
            return Response({"message": "Login realizado com sucesso!"})
        
        # Se is_valid() falhar, ele retorna os erros definidos no serializer
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

