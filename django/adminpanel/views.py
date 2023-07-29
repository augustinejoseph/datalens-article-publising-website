from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from authentication.models import Allusers
from authentication.serializers import (
    InterestSerializer,
    AllUsersSerializer,
    AuthorSerializer,
)
from backend.permissions import IsAdminInPayload, IsUserInPayload
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from authentication.models import Interests
from dashboard.models import DashBoardCount


class AllUsersList(APIView):
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAdminInPayload]

    def get(self, request):
        allUsers = Allusers.objects.exclude(is_superuser=True)
        serializer = AllUsersSerializer(allUsers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlockUser(APIView):
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAdminInPayload]

    @csrf_exempt
    def put(self, request, user_id):
        user = Allusers.objects.get(id=user_id)
        user.is_banned = not user.is_banned
        user.save()
        return Response({"message": "User is Blocked"})


class AddToAllInterests(APIView):
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAdminInPayload]

    def post(self, request):
        interest_name = request.data.get("interest_name")
        if not interest_name:
            return Response({"message: Interest cannot be empty"})
        interest_name = interest_name.lower()

        existing_interest = Interests.objects.filter(interestName=interest_name).first()
        if existing_interest:
            return Response(
                {"message": "Interest already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create a new interest
        new_interest = Interests.objects.create(interestName=interest_name)
        return Response(
            {"message": "Interest created successfully", "interest_id": new_interest.id}
        )


class AllInterestsList(APIView):
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAdminInPayload]

    def get(self, request):
        try:
            allInterests = Interests.objects.all()
            serializer = InterestSerializer(allInterests, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": "Error retrieving all interests"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DeleteInterest(APIView):
    authentication_classes = [
        JWTAuthentication,
        SessionAuthentication,
        BasicAuthentication,
    ]
    permission_classes = [IsAdminInPayload]

    def delete(self, request, interestName):
        try:
            Interests.objects.get(interestName=interestName).delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CreateInterest(APIView):
    authentication_classes = [
        JWTAuthentication,
        BasicAuthentication,
        SessionAuthentication,
    ]
    permission_classes = [IsAdminInPayload]

    def post(self, request):
        try:
            interestName = request.data.get("interestName")
            if not interestName:
                return Response(
                    {"error": "Interest field empty"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            existing_interest = Interests.objects.filter(
                interestName=interestName
            ).exists()
            if existing_interest:
                return Response(
                    {"error": "Already exists"}, status=status.HTTP_409_CONFLICT
                )
            serializer = InterestSerializer(data={"interestName": interestName})
            if serializer.is_valid():
                instance = serializer.save()
                response_data = {
                    "message": "Interest created successfully",
                    "id": instance.id,
                    "interestName": instance.interestName,
                }
                return Response(response_data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
