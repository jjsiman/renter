from properties.serializers import PropertySerializer
from rest_framework import serializers

from listings.models import Listing


class ListingSerializer(serializers.ModelSerializer):
    title = serializers.StringRelatedField(source="property")
    property = PropertySerializer()

    class Meta:
        model = Listing
        fields = ["id", "title", "property", "price"]
