from django.urls import reverse
from knox.models import AuthToken
from rest_framework import status
from rest_framework.test import APITestCase

from .factories import UserFactory


class LoginViewTests(APITestCase):
    def test_login_view(self):
        email = "test@renter.com"
        password = "test"
        user = UserFactory(email=email)
        user.set_password(password)
        user.save()

        url = reverse("login")

        data = {"email": email, "password": password}
        response = self.client.post(url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data["token"])
        self.assertTrue(response.data["expiry"])
        self.assertTrue(user.is_authenticated)

    def test_logout_view(self):
        user = UserFactory()
        instance, token = AuthToken.objects.create(user=user)
        self.client.login(user=user)

        url = reverse("logout")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token)
        response = self.client.post(url)

        self.assertTrue(response.status_code, status.HTTP_204_NO_CONTENT)
        with self.assertRaises(AuthToken.DoesNotExist):
            instance.refresh_from_db()
