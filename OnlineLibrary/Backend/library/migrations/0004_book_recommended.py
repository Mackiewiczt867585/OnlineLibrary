# Generated by Django 4.1.3 on 2023-01-13 16:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0003_alter_customuser_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='book',
            name='recommended',
            field=models.BooleanField(default=False),
        ),
    ]
