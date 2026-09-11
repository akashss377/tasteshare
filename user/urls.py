from django.urls import path

from . import views


urlpatterns = [

    path(
        "",
        views.user_list,
        name="user_list"
    ),

    path(
        "<int:id>/",
        views.user_details,
        name="user_details"
    ),
    path(
    "<int:id>/block/",
    views.block_user,
    name="block_user"
),

path(
    "<int:id>/unblock/",
    views.unblock_user,
    name="unblock_user"
),

]