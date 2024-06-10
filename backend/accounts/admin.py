from django.contrib import admin
from django.contrib.auth.admin import GroupAdmin, UserAdmin
from django.contrib.auth.models import Group as AuthGroup

from .models import Group, User

admin.site.unregister(AuthGroup)

admin.site.register(User, UserAdmin)
admin.site.register(Group, GroupAdmin)
