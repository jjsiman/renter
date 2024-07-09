from django.db import models


class Amenities(models.TextChoices):
    DISHWASHER = "dw"
    LAUNDRY = "ld"
    OUTDOOR_SPACE = "os"
    ELEVATOR = "ev"
    GARAGE = "gr"
    FIREPLACE = "fp"
    CENTRAL_AIR = "ac"
    HEATER = "ht"
