from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        refresh = RefreshToken(attrs['refresh'])
        data = {'access': str(refresh.access_token)}

        # Add additional fields to the data dictionary
        user = self.context['request'].user
        payload = refresh.access_token.payload
        for key, value in payload.items():
            data[key] = value

        return data
