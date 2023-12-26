from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.core.validators import RegexValidator, slug_re


class UserManager(BaseUserManager):
    def create_user(self, email, user_id, password=None, **extra_fields):
        """
        通常のユーザー作成メソッド
        """
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, user_id=user_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, user_id, password=None, **extra_fields):
        """
        スーパーユーザー作成メソッド
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, user_id, password, **extra_fields)

# Create your models here.
class User(AbstractUser):
    # id, password, emailはデフォルトで用意されている
    first_name = None
    last_name = None
    date_joined = None
    groups = None

    # user_idは半角文字とアンダースコアのみ許可
    user_id = models.CharField(max_length=32, verbose_name="ユーザーID", unique=True, validators=[RegexValidator(slug_re, "半角英数字とアンダースコア,ハイフンのみ使用できます", "invalid")])
    username = models.CharField(max_length=32, verbose_name="ユーザー名")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    objects = UserManager()

    USERNAME_FIELD = "user_id"
    REQUIRED_FIELDS = ["email"]

    class Meta:
        db_table = "users"
        verbose_name_plural = "ユーザー"

    def __str__(self):
        return self.user_id
    
    def get_full_name(self):
        return self.user_id
    
    def get_short_name(self):
        return self.user_id

