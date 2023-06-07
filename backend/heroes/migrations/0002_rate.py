# Generated by Django 4.2.2 on 2023-06-05 16:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("heroes", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Rate",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("rate", models.IntegerField(default=0)),
                (
                    "hero",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="rates",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
