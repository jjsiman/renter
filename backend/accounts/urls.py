from django.urls import path
from knox import views as knox_views

from .views import LoginView, LogoutView, UserProfileViewSet

urlpatterns = [
    path(r"login/", LoginView.as_view(), name="login"),
    path(r"logout/", LogoutView.as_view(), name="logout"),
    path(r"logoutall/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"),
    path(r"profile/", UserProfileViewSet.as_view(), name="profile"),
]
