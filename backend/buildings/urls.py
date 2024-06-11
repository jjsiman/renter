from django.urls import include, path
from rest_framework import routers

from .views import BuildingViewSet

router = routers.SimpleRouter()
router.register(r"", BuildingViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
