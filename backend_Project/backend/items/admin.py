from django.contrib import admin
from .models import Item, OwnedItem

# Register your models here.

admin.site.register(Item)
admin.site.register(OwnedItem)