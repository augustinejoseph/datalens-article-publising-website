from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import AllUsers
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from rest_framework import status
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction

class RegisterView(APIView):
    def post(self, request):
        with transaction.atomic():
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
        
class EmailCheckView(APIView):
    def post(self, request):
        email = request.data.get("email")
        print('recieved emil', email)
        if email:
            try:
                user = AllUsers.objects.get(email=email)
                name = user.first_name
                response = {
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                
            },
            "name": name,
            "status" : True
        }
                return Response(response)  # Return a Response with the boolean value
            except AllUsers.DoesNotExist:
                response ={
                    "status" : False
                }
                return Response(response)  # Return a Response with the boolean value
        else:
            response ={
                    "status" : False
                }
            return Response(response)

class EmailAvailability(APIView):
    def post(self, request):
        email = request.data.get("email")
        print('recieved email', email)
        try:
            user = AllUsers.objects.get(email = email)
            return Response(False)
        except ObjectDoesNotExist:
            return Response(True)

        