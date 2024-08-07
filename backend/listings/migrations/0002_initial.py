# Generated by Django 5.0.6 on 2024-07-09 02:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("listings", "0001_initial"),
        ("properties", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="listing",
            name="property",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="properties.property"
            ),
        ),
    ]
