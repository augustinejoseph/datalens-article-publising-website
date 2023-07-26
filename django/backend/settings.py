import datetime
import dj_database_url
import environ

env = environ.Env()
environ.Env.read_env()
from pathlib import Path
import os
import urllib.parse as up


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = env("SECRET_KEY")
if SECRET_KEY is None:
    raise Exception("SECRET_KEY environment variable is not set.")

DEBUG = env("DEBUG").lower() == "true"
ALLOWED_HOSTS = ["*"]


INSTALLED_APPS = [
    "corsheaders",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "authentication",
    "payments",
    "article",
    "adminpanel",
    "author",
    "dashboard",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt.token_blacklist",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            os.path.join(BASE_DIR, "authentication", "templates"),
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

# Database
if DEBUG == True:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
        },
        "articles": {},
    }

else:
    DATABASES = {"default": dj_database_url.parse(env("RENDER_POSTGRES_EXTERNAL_URL"))}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


STATIC_URL = "static/"


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTH_USER_MODEL = "authentication.Allusers"
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
}


# email smtp
EMAIL_BACKEND = env("EMAIL_BACKEND")
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "").lower() == "true"
EMAIL_PORT = int(os.getenv("EMAIL_PORT"))
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")

# For email verification
DJANGO_SITE_URL = env("DJANGO_SERVER")


SIMPLE_JWT = {
    "SIGNING_KEY": SECRET_KEY,
}
JWT_AUTH = {
    "SECRET_KEY": SECRET_KEY,
    "JWT_GET_USER_SECRET_KEY": None,
    "JWT_ALGORITHM": "HS256",
    "JWT_VERIFY": True,
    "JWT_VERIFY_EXPIRATION": True,
    "JWT_EXPIRATION_DELTA": datetime.timedelta(minutes=5),
    "JWT_ISSUER": None,
    "JWT_ALLOW_REFRESH": True,
    "JWT_REFRESH_EXPIRATION_DELTA": datetime.timedelta(days=7),
}

CORS_ALLOW_ALL_ORIGINS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]


# Media files
DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"
