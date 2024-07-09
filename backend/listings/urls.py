from django.urls import include, path
from rest_framework import routers

from listings.views import ListingViewSet

router = routers.SimpleRouter()
router.register(r"", ListingViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
