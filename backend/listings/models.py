from django.db import models

from listings.constants import ListingStatus


class ListingManager(models.Manager):
    def active(self):
        return self.filter(status=ListingStatus.ACTIVE)


class Listing(models.Model):
    property = models.ForeignKey("properties.Property", on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date_available = models.DateField(blank=True)
    status = models.SmallIntegerField(
        choices=ListingStatus.choices, default=ListingStatus.OFF_MARKET
    )
    description = models.TextField(blank=True, default="")

    objects = ListingManager()

    def __str__(self) -> str:
        return f"{self.property} - {self.date_available}"
