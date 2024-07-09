import factory
from properties.tests.factories import PropertyFactory

from listings.constants import ListingStatus
from listings.models import Listing


class ListingFactory(factory.django.DjangoModelFactory):
    property = factory.SubFactory(PropertyFactory)
    price = factory.Faker("pydecimal", right_digits=2, min_value=0, max_value=50000)
    date_available = factory.Faker("date_this_year", after_today=True)
    status = factory.Faker("random_element", elements=ListingStatus.values)
    description = factory.Faker("paragraph", nb_sentences=5)

    class Meta:
        model = Listing
