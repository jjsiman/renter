from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from .models import User


class AuthSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        trim_whitespace=False,
        write_only=True,
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(
            request=self.context.get("request"), email=email, password=password
        )

        if not user:
            msg = _("Unable to log in with provided credentials.")
            raise serializers.ValidationError(msg, code="authorization")

        attrs["user"] = user
        return attrs


class UserProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ["email"]

    def update(self, instance, validated_data):
        request = self.context.get("request", None)
        if new_password := request.data.get("new_password", False):
            user = authenticate(
                request=request,
                email=instance.email,
                password=request.data.get("password", None),
            )
            if not user:
                msg = _("Incorrect password provided.")
                raise serializers.ValidationError(msg, code="authorization")

            instance.set_password(new_password)

        return super().update(instance, validated_data)
