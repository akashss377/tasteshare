from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("login/", views.login_view, name="admin_login"),
    path("logout/",views.logout_view,name="admin_logout"),
]