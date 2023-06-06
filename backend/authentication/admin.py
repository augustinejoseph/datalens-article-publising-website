from django.contrib import admin
from .models import AllUsers

class AllUsersAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'created_at', "is_superuser"]
    list_per_page = 20
    list_filter = ['created_at', 'is_superuser']
    # list_editable = ['first_name', 'last_name',]
    

admin.site.register(AllUsers, AllUsersAdmin)