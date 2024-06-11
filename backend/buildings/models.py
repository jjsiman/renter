from django.db import models


class Building(models.Model):
    name = models.CharField(blank=False)
    description = models.TextField(blank=True, default="")

    address = models.CharField(default="")
    city = models.CharField(default="")
    state = models.CharField(default="")
    zipcode = models.PositiveIntegerField(default=0)

    units = models.PositiveSmallIntegerField(default=0)
    stories = models.PositiveSmallIntegerField(default=0)
    year_built = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.name
