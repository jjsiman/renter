from django.urls import reverse
from knox.models import AuthToken
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import User
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
        response = self.client.post(url, data)

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


class UserProfileViewSetTests(APITestCase):
    def setUp(self):
        self.password = "test"
        self.email = "test@example.com"
        self.user = UserFactory(email=self.email)
        self.user.set_password(self.password)
        self.user.save()

        self.client.force_authenticate(user=self.user)
        self.url = reverse("profile")

    def test_get_profile(self):
        response = self.client.get(self.url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], self.email)

    def test_user_can_change_email(self):
        new_email = "abc@example.com"
        response = self.client.patch(self.url, {"email": new_email})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], new_email)

        self.user.refresh_from_db()
        self.assertEqual(self.user.email, new_email)

    def test_user_can_change_password(self):
        new_password = "abc123"
        response = self.client.patch(
            self.url, {"password": self.password, "new_password": new_password}
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(new_password))

    def test_user_cannot_change_password_without_current_password(self):
        new_password = "abc123"
        response = self.client.patch(
            self.url, {"password": "error", "new_password": new_password}
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(self.password))


class SignUpViewTests(APITestCase):
    def test_can_create_new_user(self):
        url = reverse("register")
        email = "test@example.com"
        password = "fbiqnegr-145rcdqwre"
        response = self.client.post(url, {"email": email, "password": password})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        user = User.objects.get(email=email)
        self.assertTrue(user)
        self.assertTrue(user.check_password(password))
