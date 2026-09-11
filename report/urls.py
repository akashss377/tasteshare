from django.urls import path

from . import views


urlpatterns = [

    path(
        "",
        views.most_viewed_recipes,
        name="most_viewed_recipes"
    ),

]