from django.urls import path

from heroes.views import HeroListCreateAPIView, HeroRetrieveAPIView, RateHeroAPIView

urlpatterns = [
    path("rates/", RateHeroAPIView.as_view(), name="rates-create"),
    path("heroes/", HeroListCreateAPIView.as_view(), name="heroes-list-create"),
    path("heroes/<int:pk>/", HeroRetrieveAPIView.as_view(), name="heroes-retrieve"),
]
