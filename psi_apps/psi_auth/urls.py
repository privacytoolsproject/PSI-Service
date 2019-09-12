from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^signup', views.sign_up.as_view(), name='signup'),

    re_path(r'^test_user', views.test_user, name='test_user')
]
