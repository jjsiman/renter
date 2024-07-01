from django.contrib.auth import authenticate, login, logout
from django.utils.translation import gettext_lazy as _
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from rest_framework import permissions, serializers
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response

from .serializers import AuthSerializer, UserProfileSerializer


class LoginView(KnoxLoginView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = AuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]

        login(request, user)
        return super(LoginView, self).post(request, format=None)


class LogoutView(KnoxLogoutView):
    def post(self, request, format=None):
        response = super(LogoutView, self).post(request, format=None)
        logout(request)
        return response


class UserProfileViewSet(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
