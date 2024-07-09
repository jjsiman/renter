from rest_framework.pagination import LimitOffsetPagination


class StandardPagination(LimitOffsetPagination):
    max_limit = 50
