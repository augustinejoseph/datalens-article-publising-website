from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .serializers import CustomTokenRefreshSerializer
from .views import CustomTokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('authentication.urls')),
    path('payments/', include('payments.urls')),
    path('article/', include('article.urls')),
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ="token_obtain_pair"),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
