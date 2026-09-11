from django.urls import path

from . import views


urlpatterns = [

    path(
        "",
        views.recipe_list,
        name="admin_recipe_list"
    ),

    path(
        "<int:id>/",
        views.recipe_detail,
        name="admin_recipe_detail"
    ),

]