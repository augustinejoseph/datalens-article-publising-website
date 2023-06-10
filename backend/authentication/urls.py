from django.contrib import admin
from django.urls import path, include
from .views import Loginview, RegisterView, LogoutView, EmailCheckView, EmailAvailability

urlpatterns = [
    path('register', RegisterView.as_view(), name="register"),
    path('login', Loginview.as_view(), name="login"),
    path('logout', LogoutView.as_view(), name = "logout"),
    path("email-check", EmailCheckView.as_view() , name="email-check"),
    path("email-availability", EmailAvailability.as_view(), name ="email-availability")
]
