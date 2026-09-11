from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path


urlpatterns = [

    path(
        "",
        include("portal.urls")
    ),

    path(
        "recipes/",
        include("recipe_app.urls")
    ),
    path(
    "users/",
    include("user.urls")
),
    path(
    "reports/",
    include("report.urls")
),
path(
    "api/",
    include("api.urls")
),   

]


if settings.DEBUG:

    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )