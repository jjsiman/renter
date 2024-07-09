from django.db import models

from properties.constants import Amenities


# Create your models here.
class Property(models.Model):
    unit = models.CharField(max_length=10, blank=True)
    building = models.ForeignKey(
        "buildings.Building", null=True, on_delete=models.SET_NULL
    )

    amenities = models.CharField(choices=Amenities.choices, blank=True)
    bedrooms = models.SmallIntegerField(default=0)
    bathrooms = models.SmallIntegerField(default=0)
    square_footage = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "properties"

    def __str__(self) -> str:
        return f"{self.building} {self.unit}"
