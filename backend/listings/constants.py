from django.db import models


class ListingStatus(models.IntegerChoices):
    OFF_MARKET = 0
    ACTIVE = 1
    IN_CONTRACT = 2
    RENTED = 3
