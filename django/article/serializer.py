from rest_framework import serializers
from .models import SavedArticles


class AllSavedArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedArticles
        fields = "__all__"
