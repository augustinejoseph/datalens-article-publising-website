# Generated by Django 4.2.2 on 2023-07-20 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DashBoardCount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('totalUsers', models.IntegerField()),
                ('totalUserInterest', models.IntegerField()),
            ],
            options={
                'db_table': 'DashBoardCount',
            },
        ),
    ]
