from rest_framework import serializers

from heroes.models import Hero


class HeroListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ("id", "name", "power", "rate")


class HeroRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ("image", "name", "description", "power")


class HeroCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ("description", "age", "gender", "power", "image", "name")
