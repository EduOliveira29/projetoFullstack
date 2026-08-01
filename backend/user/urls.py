# user/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets.user_viewset import LoginView, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('users/login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]