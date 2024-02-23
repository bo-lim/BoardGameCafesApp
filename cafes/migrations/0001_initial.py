# Generated by Django 4.2 on 2024-02-20 23:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cafes',
            fields=[
                ('CafeID', models.IntegerField(primary_key=True, serialize=False)),
                ('Name', models.CharField(max_length=15)),
                ('Location', models.CharField(max_length=100)),
                ('PhoneNumber', models.IntegerField()),
                ('OperatingHour', models.CharField(max_length=20)),
                ('Image', models.FileField(upload_to='uploads/')),
            ],
        ),
        migrations.CreateModel(
            name='MenuItems',
            fields=[
                ('MenuItemID', models.IntegerField(primary_key=True, serialize=False)),
                ('Item', models.CharField(max_length=100)),
                ('Price', models.IntegerField()),
                ('CafeID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cafes.cafes')),
            ],
        ),
        migrations.CreateModel(
            name='CafeReviews',
            fields=[
                ('Cafe_ReviewID', models.IntegerField(primary_key=True, serialize=False)),
                ('UserID', models.IntegerField()),
                ('Comment', models.CharField(max_length=200)),
                ('Image', models.FileField(upload_to='uploads/')),
                ('CafeID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cafes.cafes')),
            ],
        ),
    ]