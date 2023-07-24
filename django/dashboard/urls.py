from django.urls import path
from .views import dashboardStatistics

urlpatterns = [path("", dashboardStatistics.as_view(), name="dashboard_statistics")]
