# user/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets.user_viewset import LoginView, UserViewSet, UserProfileUpdateView

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('users/login/', LoginView.as_view(), name='login'),
    path('users/update/', UserProfileUpdateView.as_view(), name='update'),
    path('', include(router.urls)),
]