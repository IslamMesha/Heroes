from django.urls import path

from heroes.views import HeroListCreateAPIView, HeroRetrieveAPIView

urlpatterns = [
    path("heroes/", HeroListCreateAPIView.as_view(), name="heroes-list-create"),
    path("heroes/<int:pk>/", HeroRetrieveAPIView.as_view(), name="heroes-retrieve"),
]
