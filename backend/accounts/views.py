from django.contrib.auth import login, logout
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from rest_framework import permissions

from .serializers import AuthSerializer


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
