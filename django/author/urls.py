from django.urls import path
from .views import AuthorDetails, AuthorDetailsById, UserInterestsByUserName, UserInterests, UpdateUserDetails

urlpatterns = [
    path('author-details/<str:user_name>', AuthorDetails.as_view(), name="author_details"),
    path('author-details-by-id/<int:user_id>', AuthorDetailsById.as_view(), name="author_details_by_id"),
    path('user-interests-by-username/<str:user_name>' , UserInterestsByUserName.as_view() , name ="user_interests_by_username"),
    path('user-interests/<int:user_id>' , UserInterests.as_view() , name ="user_interests"),
    path('update-user-details', UpdateUserDetails.as_view(), name = 'update_user_details'),


]
