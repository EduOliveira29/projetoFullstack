from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from ..models.user__models import User

class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        raw_token = request.COOKIES.get('access')

        if raw_token is None:
            return None

        try:
            validated_token = self.get_validated_token(raw_token)
            user_id = validated_token.get('user_id')
            user = User.objects.get(id=user_id)
            
            return user, validated_token

        except (InvalidToken, User.DoesNotExist) as e:
            return None