from django.contrib import admin
from django.urls import re_path, path, include
from django.conf import settings
from django.conf.urls.static import static
from psi_apps.content_pages.views import view_about_page
from . import views

urlpatterns = [\

    re_path(r'^signup', views.SignUp.as_view(), name='signup')
    ]
