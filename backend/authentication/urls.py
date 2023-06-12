from django.contrib import admin
from django.urls import path, include
from .views import Loginview, RegisterView, LogoutView, EmailCheckView, EmailAvailability, AllInterests, verify_email, email_verification_success, email_verification_failed

urlpatterns = [
    path('register', RegisterView.as_view(), name="register"),
    path('login', Loginview.as_view(), name="login"),
    path('logout', LogoutView.as_view(), name = "logout"),
    path("email-check", EmailCheckView.as_view() , name="email-check"),
    path("email-availability", EmailAvailability.as_view(), name ="email-availability"),
    path("all-interests", AllInterests.as_view(), name="all_interests"),
    path('verify-email/<str:uidb64>/<str:token>/', verify_email, name='verify-email'),
    path('email-verification-success/', email_verification_success, name='email_verification_success'),
    path('email-verification-failed/', email_verification_failed, name='email_verification_failed'),



]
