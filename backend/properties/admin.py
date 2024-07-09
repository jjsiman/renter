from django.contrib import admin
from listings.models import Listing

from properties.models import Property


# Register your models here.
class ListingInline(admin.TabularInline):
    model = Listing
    show_change_link = True
    extra = 0

    fields = ["date_available", "status", "price"]
    readonly_fields = ["date_available", "status", "price"]


class PropertyAdmin(admin.ModelAdmin):
    model = Property

    inlines = [ListingInline]


admin.site.register(Property, PropertyAdmin)
