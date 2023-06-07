from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from heroes.models import Hero, Rate


class LoginSerializer(TokenObtainPairSerializer):
    def update(self, instance, validated_data):
        pass

    def create(self, validated_data):
        pass

    def validate(self, attrs):
        data = super().validate(attrs)
        data["hero"] = HeroListSerializer(self.user).data
        return data


class HeroListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ("id", "name", "power", "rate", "is_superuser")


class HeroRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ("image", "name", "description", "power")


class HeroCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = ("description", "age", "gender", "power", "image", "name")


class RateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = ("rate", "hero")

    def validate(self, attrs):
        hero = attrs["hero"]
        user = self.context["request"].user
        if user == hero:
            raise serializers.ValidationError("You can't rate yourself.")
        if attrs["rate"] < 0 or attrs["rate"] > 5:
            raise serializers.ValidationError("Rate must be between 0 and 5.")
        return attrs
