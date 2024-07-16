from accounts.tests.factories import UserFactory
from buildings.models import Building
from django.http import QueryDict
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from listings.constants import ListingStatus
from listings.tests.factories import ListingFactory


class ListingViewSetTests(APITestCase):
    def setUp(self):
        user = UserFactory()
        self.client.force_authenticate(user=user)

    def test_lists_active_listings(self):
        ListingFactory.create_batch(5, status=ListingStatus.ACTIVE)
        ListingFactory.create_batch(5, status=ListingStatus.OFF_MARKET)
        url = reverse("listing-list")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)

    def test_listings_can_be_searched_by_building_name(self):
        query = "Park Place"
        ListingFactory.create_batch(
            2, property__building__name=query, status=ListingStatus.ACTIVE
        )
        ListingFactory.create_batch(
            2, property__building__name="Broadway", status=ListingStatus.ACTIVE
        )

        url = reverse("listing-list")
        q = QueryDict(f"q={query}")
        response = self.client.get(f"{url}?{q.urlencode()}", format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertIn(query, response.data[0]["title"])
