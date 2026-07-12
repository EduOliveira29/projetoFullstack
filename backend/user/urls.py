# user/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets.user_viewset import LoginView, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    # 1. Rota de login deve vir primeiro
    path('users/login/', LoginView.as_view(), name='login'),
    # 2. Router para o restante (users/1, users/2, etc)
    path('', include(router.urls)),
]