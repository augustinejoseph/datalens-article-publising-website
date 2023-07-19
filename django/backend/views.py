from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
import jwt
import uuid
from datetime import datetime, timedelta
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt


from authentication.models import Allusers

def verify_email(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = Allusers.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, Allusers.DoesNotExist):
        user = None

    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return redirect('email_verification_success')
    else:
        return redirect('email_verification_failed')



class CustomTokenRefreshView(APIView):
    @csrf_exempt
    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        print('refresh token received', refresh_token)

        try:
            print("inside refresh token try")
            decoded_refresh_token = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_refresh_token.get('user_id')
            user = Allusers.objects.get(id=user_id)
            print("user", user)
            jti = str(uuid.uuid4())
            payload = {
                'user_id': user.id,
                'user_name': user.user_name,
                'name': user.first_name,
                'email': user.email,
                'is_active': user.is_active,
                'is_banned': user.is_banned,
                'is_admin': user.is_superuser,
                'jti': jti,
                "token_type": "access",
                'exp': datetime.utcnow() + timedelta(minutes=15),
            }

            access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')
            return Response({'access_token': access_token})
        except jwt.ExpiredSignatureError:
            return Response({'error': 'Refresh token has expired'}, status=400)
        except jwt.InvalidTokenError:
            return Response({'error': 'Invalid refresh token'}, status=400)
