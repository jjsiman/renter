from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .factories import BuildingFactory


class BuildingViewSetTests(APITestCase):
    def test_list_buildings(self):
        BuildingFactory.create_batch(10)
        url = reverse("building-list")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 10)
