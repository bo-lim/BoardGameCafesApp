# Generated by Django 4.2 on 2024-02-23 10:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cafes', '0004_alter_cafes_phonenumber'),
    ]

    operations = [
        migrations.AddField(
            model_name='cafereviews',
            name='Rating',
            field=models.FloatField(default=0, max_length=10),
        ),
        migrations.AlterField(
            model_name='cafereviews',
            name='Image',
            field=models.FileField(null=True, upload_to='uploads/review/'),
        ),
        migrations.AlterField(
            model_name='cafes',
            name='Image',
            field=models.FileField(null=True, upload_to='uploads/cafe/'),
        ),
    ]
