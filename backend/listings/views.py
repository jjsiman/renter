from rest_framework import filters, permissions, viewsets
from utils.pagination import StandardPagination

from listings.models import Listing
from listings.serializers import ListingSerializer


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.active().select_related("property__building")
    serializer_class = ListingSerializer

    permission_classes = [permissions.AllowAny]

    pagination_class = StandardPagination

    filter_backends = [filters.SearchFilter]
    search_fields = ["property__building__name", "property__unit"]
