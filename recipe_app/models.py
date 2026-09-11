from django.conf import settings
from django.db import models


class Recipe(models.Model):

    DIFFICULTY_CHOICES = [

        ("Easy", "Easy"),
        ("Medium", "Medium"),
        ("Hard", "Hard"),

    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    title = models.CharField(
        max_length=200
    )

    ingredients = models.TextField()

    steps = models.TextField()

    cooking_time = models.PositiveIntegerField()

    difficulty_level = models.CharField(
        max_length=20,
        choices=DIFFICULTY_CHOICES
    )

    image = models.ImageField(
        upload_to="recipes/"
    )

    view_count = models.PositiveIntegerField(
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        return self.title