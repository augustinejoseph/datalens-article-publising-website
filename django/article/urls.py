from django.urls import path
from .views import SaveArticle, AllSavedArticles

urlpatterns = [
    path("add-to-saved-article", SaveArticle.as_view(), name="add_to_saved_article"),
    path(
        "all-saved-article/<str:user_name>",
        AllSavedArticles.as_view(),
        name="all_saved_article",
    ),
]
