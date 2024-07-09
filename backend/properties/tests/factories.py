import factory
from buildings.tests.factories import BuildingFactory

from properties.constants import Amenities
from properties.models import Property


class PropertyFactory(factory.django.DjangoModelFactory):
    unit = factory.Faker("secondary_address")
    building = factory.SubFactory(BuildingFactory)

    amenities = factory.Faker("random_elements", elements=Amenities.values, unique=True)
    bedrooms = factory.Faker("random_digit_not_null")
    bathrooms = factory.Faker("random_digit_not_null")
    square_footage = factory.Faker("randomize_nb_elements", number=400)

    class Meta:
        model = Property
