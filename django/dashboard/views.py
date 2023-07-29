from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from authentication.models import Allusers, Interests


class dashboardStatistics(APIView):
    def get(self, request):
        totalUsers = Allusers.objects.count()
        totalInterests = Interests.objects.count()
        return Response({"totalUsers": totalUsers, "totalInterests": totalInterests})
