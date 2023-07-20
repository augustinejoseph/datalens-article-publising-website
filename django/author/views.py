from django.shortcuts import render
from authentication.models import Allusers, Userinterests, Interests
from authentication.serializers import AuthorSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from backend.permissions import  IsAdminInPayload, IsUserInPayload
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


# Author Details
class AuthorDetails(APIView):
    def get(self, request, user_name):
        try:
            user = Allusers.objects.get(user_name=user_name)
            serializer = AuthorSerializer(user)
            return Response(serializer.data)
        except Allusers.DoesNotExist:
            return Response({"error": "User  not found"}, status=404)

class AuthorDetailsById(APIView):
    def get(self, request, user_id):
        try:
            user = Allusers.objects.get(id=user_id)
            serializer = AuthorSerializer(user)
            return Response(serializer.data)
        except Allusers.DoesNotExist:
            return Response({"error": "User  not found"}, status=404)


class UserInterestsByUserName(APIView):
    def get(self, request, user_name):
        try:
            user_interests = Userinterests.objects.filter(user__user_name=user_name)
            print("----------------user interests from table", user_interests)
            serialized_interests = [{'user': interest.user.user_name, 'interest': interest.interest.interestName} for interest in user_interests]
            return Response({'user_interests': serialized_interests}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            print("user does not exist")
            return Response({'error': 'User interests not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("internal server error:", e)
            return Response({'error': "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdateUserDetails(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes =[IsUserInPayload]
    def post(self, request):
        user_id = request.data.get('id')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        interests = request.data.get('interests')
        try:
            user = Allusers.objects.get(id=user_id)
            print("-------------------user found", user)
            user.first_name = first_name
            user.last_name = last_name
            user.save()

            user_interests = Userinterests.objects.filter(user=user)
            user_interests.delete()
            print("--------------user interests deleted")

            for interest in interests:
                interest_obj, _ = Interests.objects.get_or_create(interestName=interest)
                Userinterests.objects.create(user=user, interest=interest_obj)
                print("-------------------new user interests created")

            return Response({"message": "Updated Successfully"})
        except Allusers.DoesNotExist:
            print('-------------------user does not exist')
            return Response({"message": "User does not exist"})
        except Exception as e:
            print('-------------------internal server error:', str(e))
            return Response({"message": "Internal Server Error"})


class UserInterests(APIView):
    def get(self, request, user_id):
        try:
            user_interests = Userinterests.objects.filter(user_id=user_id)
            print("user interests from table based on user interets.  from node server ", user_interests)
            serialized_interests = [{'user': interest.user.user_name, 'interest': interest.interest.interestName} for interest in user_interests]
            return Response({'user_interests': serialized_interests}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            print("user does not exist")
            return Response({'error': 'User interests not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print("internal server error:", e)
            return Response({'error': "Internal server error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
