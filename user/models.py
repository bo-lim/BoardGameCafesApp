from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password, nickname, age, gender, **kwargs):
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(
            email=email,
            nickname=nickname,
            age=age,
            gender=gender
        )
        user.is_superuser = False
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self, email=None, password=None, nickname=None, age=None, gender=None,**extra_fields):
        superuser = self.create_user(
            email=email,
            password=password,
            nickname=nickname,
            age=age,
            gender=gender
        )
        superuser.is_superuser = True
        superuser.save(using=self._db)
        return superuser

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True, null=False, blank=False)
    nickname = models.CharField(max_length=30, null=False)
    age = models.IntegerField(null=False, default=0)
    gender = models.CharField(max_length=10,null=True)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()
    USERNAME_FIELD = 'email'


