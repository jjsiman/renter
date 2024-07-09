from rest_framework import serializers

from properties.models import Property


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        exclude = ["building", "amenities"]
