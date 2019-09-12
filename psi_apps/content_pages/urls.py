from django.conf import settings
from django.urls import path, re_path
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.conf.urls.static import static

import psi_apps.content_pages.views
from . import views

urlpatterns = [

    re_path(r'^listDatasets$',
            views.list_datasets,
            name='list-datasets'),

    re_path(r'^listWorkspaces$',
            views.list_workspaces,
            name='list-workspaces'),

    re_path(r'^getWorkspace$',
            views.get_workspace,
            name='get-workspace'),


    # for k8s healthchecks
    re_path(r'^monitoring/alive$',
            psi_apps.content_pages.views.view_monitoring_alive,
            name='view_monitoring_alive'),

    re_path(r'^',
            views.application,
            name='application'),

]


if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.TEST_DIRECT_STATIC)
