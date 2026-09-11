from django.contrib.auth.models import User
from django.shortcuts import render , get_object_or_404 ,redirect
from django.contrib.auth.decorators import login_required
from recipe_app.models import Recipe
from django.contrib import messages


@login_required
def user_list(request):

    users = User.objects.filter(
        is_superuser=False
    )

    return render(
        request,
        "user/user_list.html",
        {
            "users": users
        }
    )

@login_required
def user_details(request, id):

    user = get_object_or_404(
        User,
        id=id
    )

    recipes = Recipe.objects.filter(
        user=user
    )

    return render(
        request,
        "user/user_details.html",
        {
            "user": user,
            "recipes": recipes
        }
    )
@login_required
def block_user(request, id):

    user = get_object_or_404(
        User,
        id=id
    )

    user.is_active = False

    user.save()
    messages.success(
        request,
        "User blocked successfully."
    )

    return redirect(
        "user_list"
    )
@login_required
def unblock_user(request, id):

    user = get_object_or_404(
        User,
        id=id
    )

    user.is_active = True

    user.save()
    messages.success(
        request,
        "User unblocked successfully."
    )

    return redirect(
        "user_list"
    )        