from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import stripe
import traceback
import environ
env = environ.Env()
environ.Env.read_env()
from pathlib import Path
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from django.conf import settings

stripe.api_key = env('STRIPE_SECRET_KEY')
@api_view(['POST'])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000, currency='pln', 
        payment_method_types=['card'],
        receipt_email='test@example.com')
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


FRONTEND_SITE_URL = env('FRONTEND_SITE_URL')
STRIPE_CORS_ORIGINS = ["http://localhost:5173"]

class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            price_id = request.data.get('priceId')
            print(price_id)
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price': price_id,
                        'quantity': 1,
                    },
                ],
                payment_method_types=['card'],
                mode='subscription',
                success_url = env('DJANGO_SERVER')
            )
            return redirect(checkout_session.url)
        except Exception as e:
            print("Exception in stripe session creation:", str(e))
            print(traceback.format_exc())
            return Response(
                {'error': 'Something went wrong when creating stripe checkout session'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )