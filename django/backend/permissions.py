from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.authentication import JWTAuthentication

class IsUserInPayload(BasePermission):
    def has_permission(self, request, view):
        jwt_auth = JWTAuthentication()
        try:
            token = jwt_auth.get_validated_token(request.headers.get('Authorization').split(' ')[1])
            user = jwt_auth.get_user(token) 
            print('user in middleware', user)           
            return user is not None
        except:
            return False

class IsAdminInPayload(BasePermission):
    def has_permission(self, request, view):
        jwt_auth = JWTAuthentication()
        try:
            token = jwt_auth.get_validated_token(request.headers.get('Authorization').split(' ')[1])
            user = jwt_auth.get_user(token)
            print('admin in middleware', user)           
            is_admin = user.is_superuser
            print('is admin', is_admin)
            return is_admin is True
        except Exception as e:
            print('Error in permission check:', e)
            return False

