# Generated by Django 4.2.2 on 2023-06-26 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='allusers',
            name='user_name',
            field=models.CharField(max_length=250, null=True, unique=True),
        ),
    ]
