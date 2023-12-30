from django.db import models
import uuid

# Create your models here.

class Item(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=256, verbose_name="アイテム名")
    is_public = models.BooleanField(verbose_name="公開設定")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    class Meta:
        db_table = "items"
        verbose_name_plural = "アイテム"

    def __str__(self):
        return self.name


class OwnedItem(Item):
    user = models.ForeignKey("accounts.User", on_delete=models.CASCADE, verbose_name="所有者") 

    class Meta:
        db_table = "owned_items"
        verbose_name_plural = "所有アイテム"

    def __str__(self):  
        return f"{self.name} - {self.user.user_id}"


# class NonOwnedItem(Item):
#     team = models.ForeignKey(Team, on_delete=models.CASCADE, verbose_name="チームid")
