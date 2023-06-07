from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from heroes.models import Hero, Rate
from heroes.serializers import (
    HeroCreateSerializer,
    HeroListSerializer,
    HeroRetrieveSerializer, LoginSerializer, RateSerializer,
)


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class HeroListCreateAPIView(generics.ListCreateAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroListSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

    def get_queryset(self):
        """
        Filter the queryset by name or power if search query parameter is provided.
        """
        queryset = self.queryset
        search_query = self.request.query_params.get("search", None)
        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) | Q(power__icontains=search_query)
            )

        sort_by = self.request.query_params.get("sort_by", None)
        if sort_by and sort_by in ["name", "power", "-name", "-power"]:
            queryset = queryset.order_by(sort_by)

        return queryset

    def get_serializer_context(self):
        """
        Add prefetch_related to the serializer context to optimize the hero search.
        """
        context = super().get_serializer_context()
        search_query = self.request.query_params.get("search", None)
        if search_query:
            context["prefetch_related"] = ["heroes"]
        return context

    def get_serializer_class(self):
        """
        Use HeroCreateSerializer for POST requests and HeroListSerializer for GET requests.
        """
        if self.request.method in ["POST", "PUT", "PATCH"]:
            return HeroCreateSerializer
        return HeroListSerializer


class HeroRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Hero.objects.all()
    serializer_class = HeroRetrieveSerializer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]


class RateHeroAPIView(generics.CreateAPIView):
    queryset = Rate.objects.all()
    serializer_class = RateSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def perform_create(self, serializer):
        serializer.save(by=self.request.user)
