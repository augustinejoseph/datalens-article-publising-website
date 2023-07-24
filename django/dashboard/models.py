from django.db import models


class DashBoardCount(models.Model):
    name = models.CharField(max_length=250, default="name")
    count = models.IntegerField(default=0)

    class Meta:
        db_table = "DashBoardCount"
