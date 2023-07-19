from django.urls import path, include
from .views import AllUsersList, BlockUser, AddToAllInterests, AllInterestsList, DeleteInterest, CreateInterest

urlpatterns = [
    path('all-users/', AllUsersList.as_view(), name='all-users'),
    path('block-user/<int:user_id>', BlockUser.as_view(), name='block-user'),
    path("add-to-all-interests", AddToAllInterests.as_view(), name="add_to_all_interests"),
    path('all-interests', AllInterestsList.as_view(), name = "all_interests" ),
    path('delete-interest/<str:interestName>', DeleteInterest.as_view(), name="delete_interest"),
    path('new-interest', CreateInterest.as_view(), name="create_new_interest")

]