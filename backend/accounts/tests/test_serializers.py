from django.test import TestCase
from rest_framework import serializers

from accounts.models import User
from accounts.serializers import UserCreationSerializer
from accounts.tests.factories import UserFactory


class UserCreationSerializerTests(TestCase):
    serializer_class = UserCreationSerializer

    def test_email_must_be_unique(self):
        email = "test@example.com"
        UserFactory(email=email)

        data = {"email": email, "password": "i90h35nsv-fv8043td"}
        serializer = self.serializer_class(data=data)
        with self.assertRaises(serializers.ValidationError) as cm:
            serializer.is_valid(raise_exception=True)

        self.assertTrue("email" in cm.exception.detail)
        self.assertEqual(User.objects.filter(email=email).count(), 1)

    def test_password_must_be_strong(self):
        data = {"email": "test@example.com", "password": "test"}
        serializer = self.serializer_class(data=data)
        serializer.is_valid()
        with self.assertRaises(serializers.ValidationError) as cm:
            serializer.save()

        self.assertTrue("password" in cm.exception.detail)
