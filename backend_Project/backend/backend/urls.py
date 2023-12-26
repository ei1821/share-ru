from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views
from django.conf.urls import url

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/',include('djoser.urls')), #add
    path('api/auth/',include('djoser.urls.jwt')), #add
]
