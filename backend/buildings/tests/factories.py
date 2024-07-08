import random

import factory
from factory.faker import faker

from buildings.models import Building

fake = faker.Faker()


class BuildingFactory(factory.django.DjangoModelFactory):
    name = factory.SelfAttribute("address")
    description = factory.Faker("paragraph", nb_sentences=5)

    # Compiled manually because factory.Faker("street_address") sometimes includes Apt. or Suite #
    address = factory.LazyAttribute(
        lambda p: f"{fake.building_number()} {fake.street_name()} {fake.street_suffix()}"
    )
    city = factory.Faker("city")
    state = factory.Faker("administrative_unit")
    zipcode = factory.Faker("zipcode")

    stories = factory.Faker("random_int", min=1, max=10)
    units = factory.LazyAttribute(lambda b: b.stories * random.randint(1, 10))
    year_built = factory.Faker("random_int", min=1950, max=2023)

    class Meta:
        model = Building
