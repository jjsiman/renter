from rest_framework import viewsets
from utils.pagination import StandardPagination

from listings.models import Listing
from listings.serializers import ListingSerializer


class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.active()
    serializer_class = ListingSerializer
    pagination_class = StandardPagination
