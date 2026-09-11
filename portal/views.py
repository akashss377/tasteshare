from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from recipe_app.models import Recipe

@login_required(login_url='admin_login')
def home(request):

  
    context = {

        "recipe_count":
            Recipe.objects.count(),

        "user_count":
            User.objects.filter(
                is_superuser=False
            ).count(),

        "recent_recipes":
            Recipe.objects.order_by(
                "-created_at"
            )[:5],

        "most_viewed_recipes":
            Recipe.objects.order_by(
                "-view_count"
            )[:5],

    }

    return render(
        request,
        "portal/home.html",
        context
    )

def login_view(request):
    if request.method == "POST":
        name = request.POST["name"]
        password = request.POST["password"]
        user = authenticate(username=name, password=password)
        print(name, password)
        if user and user.is_superuser:
            login(request, user)
            return redirect("home")
    return render(request, "portal/login.html")

@login_required(login_url='admin_login')
def logout_view(request):
    logout(request)
    return redirect("admin_login")