from django.shortcuts import render
from rest_framework.views import APIView
from authentication.models import Allusers
from .models import SavedArticles
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializer import AllSavedArticlesSerializer
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from backend.permissions import  IsAdminInPayload, IsUserInPayload
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class SaveArticle(APIView):
    # authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    # permission_classes =[IsUserInPayload]
    def post(self, request):
        print("--------------------------saved articles req data", request.data)
        user_id = request.data.get('userId')
        article_id = request.data.get('articleId')
        preview_image = request.data.get('previewImage')
        reading_time = request.data.get('readingTime')
        summary = request.data.get('summary')
        title = request.data.get('title')
        user_name = request.data.get('userName')
        user_id = request.data.get('userId')

        user = Allusers.objects.get(id = user_id)
        print(f"--------------------user {user}")

        if SavedArticles.objects.filter(user=user, article_id=article_id).exists():
            return Response({'message': 'Article is already saved'})

        SavedArticles.objects.create(
            user=user,
            article_id=article_id,
            preview_image=preview_image,
            reading_time=reading_time,
            summary=summary,
            title=title,
            user_name=user_name,
            user_id=user_id
        )

        return Response({'message': 'Article saved successfully', })

    
class AllSavedArticles(APIView):
    # authentication_classes = [JWTAuthentication, SessionAuthentication, BasicAuthentication]
    # permission_classes =[IsUserInPayload]
    def get(self, request, user_name):
        try:
            user = Allusers.objects.get(user_name = user_name)
            saved_articles = SavedArticles.objects.filter(user = user)
            serializer = AllSavedArticlesSerializer(saved_articles, many=True)
            return Response(serializer.data)
        except Allusers.DoesNotExist:
            return Response({"message" : "User does not exist", }, status=status.HTTP_404_NOT_FOUND)
        except SavedArticles.DoesNotExist:
            return Response({'message': "No saved articles"}, status=status.HTTP_404_NOT_FOUND)