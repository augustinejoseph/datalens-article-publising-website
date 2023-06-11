from django.db import migrations


def add_initial_interests(apps, schema_editor):
    Interests = apps.get_model('authentication', 'Interests')
    interests_data = [
        {'interestName': 'Photography'},
        {'interestName': 'Tech'},
        {'interestName': 'Programming'},
        {'interestName': 'Money'},
        {'interestName': 'Business'},
        {'interestName': 'Entrepreneurship'},
        {'interestName': 'Work'},
        {'interestName': 'Lifestyle'},
    ]
    for data in interests_data:
        Interests.objects.create(**data)


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_alter_interests_table_alter_userinterests_table'),
    ]

    operations = [
        migrations.RunPython(add_initial_interests),
    ]
