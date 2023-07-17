from payments import views
from django.urls import re_path
from .views import StripeCheckoutView,stripe_webhook
from django.urls import path



urlpatterns = [
    re_path(r'^test-payment/$', views.test_payment),
    path('create-checkout-session', StripeCheckoutView.as_view()),
    path('stripe-webhook/', stripe_webhook, name='stripe_webhook')
]