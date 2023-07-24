from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.text import slugify


class TemplateTable(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class UserManager(BaseUserManager):
    def _create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(email, password, **extra_fields)


class Allusers(AbstractUser):
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False)
    is_banned = models.BooleanField(default=False)
    is_premium = models.BooleanField(default=False)
    user_name = models.CharField(max_length=250, unique=True, null=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/", null=True, blank=True
    )

    def save(self, *args, **kwargs):
        print(self.user_name)
        if not self.user_name:
            # Generate username from email and append a unique suffix
            user_name = slugify(self.email.split("@")[0])
            suffix = 1
            while Allusers.objects.filter(user_name=user_name).exists():
                print("inside user exists, adding suffix")
                user_name = f"{slugify(self.email.split('@')[0])}{suffix}"
                suffix += 1
            self.user_name = user_name
        super().save(*args, **kwargs)

    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        db_table = "allusers"


# User Interests
class Interests(models.Model):
    interestName = models.CharField(max_length=250)

    def __str__(self):
        return self.interestName

    class Meta:
        db_table = "All Interests"


#
class Userinterests(models.Model):
    user = models.ForeignKey(Allusers, on_delete=models.CASCADE)
    interest = models.ForeignKey(Interests, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.first_name} - {self.interest.interestName}"

    class Meta:
        db_table = "User Interests"
