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
from django.http import HttpResponse
from authentication.models import Allusers
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view


stripe.api_key = env("STRIPE_SECRET_KEY")
stripe_webhook_secret = env("STRIPE_WEBHOOK_SECRET")


@api_view(["POST"])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000,
        currency="pln",
        payment_method_types=["card"],
        receipt_email="test@example.com",
    )
    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


FRONTEND_SITE_URL = env("FRONTEND_SITE_URL")


class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            price_id = request.data.get("priceId")
            user_id = request.data.get("userId")
            customer = stripe.Customer.create(metadata={"user_id": user_id})

            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        "price": price_id,
                        "quantity": 1,
                    },
                ],
                payment_method_types=["card"],
                mode="subscription",
                success_url=f"{FRONTEND_SITE_URL}/payment/success",
                cancel_url=f"{FRONTEND_SITE_URL}/payment/failed",
                customer=customer.id,
                subscription_data={
                    "metadata": {
                        "user_id": user_id,
                    }
                },
            )
            return Response(checkout_session.url)
        except Exception as e:
            return Response(
                {"error": "Something went wrong when creating stripe checkout session"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


@csrf_exempt
@api_view(["POST"])
def stripe_webhook(request):
    payload = request.body
    sig_header = request.headers.get("Stripe-Signature")
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, stripe_webhook_secret
        )
    except ValueError as e:
        return Response(status=400)
    except stripe.error.SignatureVerificationError as e:
        return Response(status=400)

    if event.type == "payment_intent.succeeded":
        payment_intent = event.data.object
        customer_id = payment_intent.customer
        Customer = stripe.Customer.retrieve(customer_id)
        user_id = Customer.metadata.get("user_id")
        user = Allusers.objects.get(id=user_id)
        user.is_premium = True
        user.save()

    return Response(status=200)
