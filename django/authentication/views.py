from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import (
    UserSerializer,
    InterestSerializer,
    AllUsersSerializer,
    AuthorSerializer,
)
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import Allusers, Interests, Userinterests
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from rest_framework import status
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction

# Email
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.conf import settings
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from rest_framework.response import Response

from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import EmailMessage
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.shortcuts import render
from authentication.models import Allusers
import jwt
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from datetime import datetime, timedelta
from django.views.decorators.csrf import csrf_exempt
from backend.permissions import IsAdminInPayload, IsUserInPayload

# Env files
import environ

env = environ.Env()
environ.Env.read_env()


class RegisterView(APIView):
    def post(self, request):
        try:
            with transaction.atomic():
                serializer = UserSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                user = serializer.save()

                # Send verification email
                current_site = get_current_site(request)
                verification_token = default_token_generator.make_token(user)
                uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
                verification_link = f"{settings.DJANGO_SITE_URL}/user/verify-email/{uidb64}/{verification_token}/"
                email_subject = "Email Verification"
                email_message = render_to_string(
                    "email_verification.html",
                    {
                        "verification_link": verification_link,
                    },
                )
                email = EmailMessage(
                    email_subject,
                    email_message,
                    settings.EMAIL_HOST_USER,
                    [user.email],
                )
                email.content_subtype = "html"  # Set content type as HTML

                # Send the email
                email.send()

                return Response(
                    {
                        "success": True,
                        "message": "Registration Successful. Verify Email",
                        "status": 200,
                    },
                    status=status.HTTP_201_CREATED,
                )

        except ValidationError as e:
            errors = {}
            for field, field_errors in e.error_dict.items():
                # Customize the error messages based on the field
                if field == "email" and "unique" in field_errors:
                    errors[field] = "Email already exists."
                elif field == "password":
                    errors[field] = "Invalid password."
                else:
                    errors[field] = field_errors[0]  # Use the first error message

            return Response(
                {"success": False, "errors": errors, "status": 400},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except Exception as e:
            return Response(
                {"success": False, "message": "Internal Server Error", "status": 500},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class Loginview(APIView):
    def post(self, request):
        try:
            email = request.data["email"]
            password = request.data["password"]

            user = Allusers.objects.get(email=email)
            if user.is_banned:
                raise AuthenticationFailed("Banned user")

            if user is None:
                raise AuthenticationFailed("Invalid email or password")
            if not user.check_password(password):
                raise AuthenticationFailed("Incorrect Password")

            payload = {
                "user_id": user.id,
                "name": user.first_name,
                "user_name": user.user_name,
                "email": user.email,
                "is_active": user.is_active,
                "is_banned": user.is_banned,
                "is_admin": user.is_superuser,
                "is_premium": user.is_premium,
                "exp": datetime.utcnow() + timedelta(minutes=15),
            }

            access_token = jwt.encode(
                payload, settings.SECRET_KEY, algorithm="HS256"
            ).decode("utf-8")
            refresh_token = str(RefreshToken.for_user(user))
            return Response(
                {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "status": 200,
                }
            )

        except Allusers.DoesNotExist:
            raise AuthenticationFailed("Invalid email or password")

        except AuthenticationFailed as e:
            raise e

        except Exception as e:
            raise AuthenticationFailed("An error occurred during login")


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response("Logout Successful", status=status.HTTP_200_OK)
        except TokenError:
            raise AuthenticationFailed("Invalid Token")


class EmailCheckView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if email:
            try:
                user = Allusers.objects.get(email=email)
                name = user.first_name
                response = {
                    "user": {
                        "id": user.id,
                        "email": user.email,
                        "first_name": user.first_name,
                        "last_name": user.last_name,
                    },
                    "name": name,
                    "status": True,
                }
                return Response(response)  # Return a Response with the boolean value
            except Allusers.DoesNotExist:
                response = {"status": False}
                return Response(response)  # Return a Response with the boolean value
        else:
            response = {"status": False}
            return Response(response)


class EmailAvailability(APIView):
    def post(self, request):
        email = request.data.get("email")
        try:
            user = Allusers.objects.get(email=email)
            return Response(False)
        except ObjectDoesNotExist:
            return Response(True)


class AllInterests(APIView):
    def get(self, request):
        interests = Interests.objects.all()
        serializer = InterestSerializer(interests, many=True)
        return Response(serializer.data)


def verify_email(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = Allusers.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Allusers.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return redirect("email_verification_success")
    else:
        return redirect("email_verification_failed")


def email_verification_success(request):
    return render(request, "email_verification_success.html")


def email_verification_failed(request):
    return render(request, "email_verification_failed.html")


# Admin Login
class AdminLogin(APIView):
    def post(self, request):
        email = self.request.data["email"]
        password = self.request.data["password"]
        user = Allusers.objects.get(email=email)
        if user is None:
            raise AuthenticationFailed("No such admin exist")
        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect Password")
        if not user.is_superuser:
            raise AuthenticationFailed("No admin privileges")
        access_token = AccessToken.for_user(user)
        access_token["name"] = "Admin"
        access_token["email"] = user.email
        access_token["is_active"] = user.is_active
        access_token["is_banned"] = user.is_banned
        access_token["is_admin"] = user.is_superuser
        access_token = str(access_token)
        refresh_token = str(RefreshToken.for_user(user))
        return Response({"access_token": access_token, "refresh_token": refresh_token})


# Resend verification email
class ResendVerificationEmail(APIView):
    def post(self, request):
        email = request.data.get("email")

        user = Allusers.objects.get(email=email)
        if user:
            verification_token = default_token_generator.make_token(user)
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            verification_link = f"{settings.DJANGO_SITE_URL}/user/verify-email/{uidb64}/{verification_token}/"
            email_subject = "Email Verification"
            email_message = render_to_string(
                "email_verification.html",
                {
                    "verification_link": verification_link,
                },
            )
            email = EmailMessage(
                email_subject,
                email_message,
                settings.EMAIL_HOST_USER,
                [user.email],
            )
            email.content_subtype = "html"
            email.send()

            return Response(
                {"success": True, "message": "Verification email resent."},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"success": False, "message": "User not found."},
                status=status.HTTP_404_NOT_FOUND,
            )
