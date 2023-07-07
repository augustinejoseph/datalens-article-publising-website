from django.contrib import admin
from django.urls import path, include
from .views import Loginview, RegisterView, LogoutView, EmailCheckView, EmailAvailability, AllInterests, verify_email, email_verification_success, email_verification_failed, AdminLogin, AllUsersList, BlockUser,AuthorDetails, AuthorDetailsById, ResendVerificationEmail

urlpatterns = [
    # Normal User
    path('register', RegisterView.as_view(), name="register"),
    path('login', Loginview.as_view(), name="login"),
    path('logout', LogoutView.as_view(), name = "logout"),
    path("email-check", EmailCheckView.as_view() , name="email-check"),
    path("email-availability", EmailAvailability.as_view(), name ="email-availability"),
    path("all-interests", AllInterests.as_view(), name="all_interests"),
    path('verify-email/<str:uidb64>/<str:token>/', verify_email, name='verify-email'),
    path('resend-verification-mail', ResendVerificationEmail.as_view(), name="resend-email"  ),
    path('email-verification-success/', email_verification_success, name='email_verification_success'),
    path('email-verification-failed/', email_verification_failed, name='email_verification_failed'),
    path('admin-login', AdminLogin.as_view(), name='admin-logon'),

    # Admin Functionality
    path('all-users/', AllUsersList.as_view(), name='all-users'),
    path('block-user/<int:user_id>', BlockUser.as_view(), name='block-user'),

    # Author Details
    path('author-details/<str:user_name>', AuthorDetails.as_view(), name="author_details"),
    
    path('author-details-by-id/<int:user_id>', AuthorDetailsById.as_view(), name="author_details_by_id"),

]
