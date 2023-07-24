from django.db import models
from authentication.models import Allusers

# Create your models here.


class SavedArticles(models.Model):
    user = models.ForeignKey(Allusers, on_delete=models.CASCADE)
    article_id = models.CharField(max_length=1000)
    preview_image = models.CharField(max_length=1000, default="")
    reading_time = models.CharField(max_length=100, default="")
    summary = models.TextField(default="")
    title = models.CharField(max_length=250, default="")
    user_name = models.CharField(max_length=250, default="")

    def __str__(self):
        return f"Saved Article - ID: {self.id}"

    class Meta:
        db_table = "Saved Articles"
