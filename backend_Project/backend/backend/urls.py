from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views
from accounts.views import UserViewSet
from items.views import ItemViewSet, OwnedItemViewSet

router = routers.DefaultRouter()
router.register(r'todos', views.TodoView, 'todo')
router.register(r'users', UserViewSet, "users")
router.register(r'items', ItemViewSet, "items")
router.register(r'owned-items', OwnedItemViewSet, "owneditems")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/',include('djoser.urls')), #add
    path('api/auth/',include('djoser.urls.jwt')), #add
]
