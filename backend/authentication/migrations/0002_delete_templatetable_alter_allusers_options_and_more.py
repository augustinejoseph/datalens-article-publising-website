# Generated by Django 4.2.1 on 2023-06-06 07:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='TemplateTable',
        ),
        migrations.AlterModelOptions(
            name='allusers',
            options={},
        ),
        migrations.RemoveField(
            model_name='allusers',
            name='username',
        ),
        migrations.AlterModelTable(
            name='allusers',
            table='all_users',
        ),
    ]
