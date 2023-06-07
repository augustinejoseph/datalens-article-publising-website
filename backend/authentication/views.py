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
        print("Received from React", email, password)
        
        try:
            user = AllUsers.objects.get(email = email)
        except AllUsers.DoesNotExist:
            raise AuthenticationFailed("Account does  not exist")

        if user is None:
            raise AuthenticationFailed("User does not exist")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")
        access_token = str(AccessToken.for_user(user))
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