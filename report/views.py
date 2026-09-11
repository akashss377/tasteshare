from django.shortcuts import render
from django.contrib.auth.decorators import login_required

from recipe_app.models import Recipe


@login_required
def most_viewed_recipes(request):

    recipes = Recipe.objects.order_by(
        "-view_count"
    )

    return render(
        request,
        "report/most_viewed_recipes.html",
        {
            "recipes": recipes
        }
    )