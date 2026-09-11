from django.urls import path

from .views import (
    register,
    login,
    logout,
    recipe_list,
    recipe_detail,
    recipe_create,
    profile,
    change_password
)


urlpatterns = [

    path(
        "register/",
        register,
        name="register"
    ),

    path(
        "login/",
        login,
        name="login"
    ),

    path(
        "logout/",
        logout,
        name="logout"
    ),

    path(
        "recipes/",
        recipe_list,
        name="recipe_list"
    ),

    path(
        "recipes/<int:id>/",
        recipe_detail,
        name="recipe_detail"
    ),

    path(
        "profile/",
        profile,
        name="profile"
    ),

    path(
        "change-password/",
        change_password,
        name="change_password"
    ),

]