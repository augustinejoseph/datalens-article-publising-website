from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import AllUsers
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from rest_framework import status
from rest_framework import status


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"success": True, "message": "Registration Successful. Verify Email"},
                            status=status.HTTP_201_CREATED)
        else:
            errors = {}
            for field, field_errors in serializer.errors.items():
                # Customize the error messages based on the field
                if field == 'email' and 'unique' in field_errors:
                    errors[field] = "Email already exists."
                elif field == 'password':
                    errors[field] = "Invalid password."
                else:
                    errors[field] = field_errors[0]  # Use the first error message

            return Response({"success": False, "errors": errors}, status=status.HTTP_400_BAD_REQUEST)


class Loginview(APIView):
    def post(self, request):
        email = request.data["email"]
        password = request.data["password"]
        # print("Received from React", email, password)
        
        
        user = AllUsers.objects.get(email = email)

        if user is None:
            raise AuthenticationFailed("Invalid email or password")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")
        access_token = AccessToken.for_user(user)
        access_token['name'] = user.first_name
        access_token['email'] = user.email
        access_token['is_active'] = user.is_active
        access_token['is_banned'] = user.is_banned
        access_token = str(access_token)
        refresh_token = str(RefreshToken.for_user(user))
        return Response({
            "access_token" : access_token,
            "refresh_token" : refresh_token
        })
    
class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response("Logout Successful", status=status.HTTP_200_OK)
        except TokenError:
            raise AuthenticationFailed("Invalid Token")