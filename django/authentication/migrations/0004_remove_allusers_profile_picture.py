# Generated by Django 4.2.2 on 2023-07-26 05:00

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("authentication", "0003_allusers_profile_picture"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="allusers",
            name="profile_picture",
        ),
    ]
