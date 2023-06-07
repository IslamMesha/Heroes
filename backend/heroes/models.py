from django.contrib.auth.models import AbstractUser
from django.db import models


class Rate(models.Model):
    rate = models.IntegerField(default=0)
    hero = models.ForeignKey("Hero", on_delete=models.CASCADE, related_name="rates")
    by = models.ForeignKey("Hero", on_delete=models.CASCADE, related_name="rates_given")

    def __str__(self):
        return f"{self.by.name} rated {self.hero.name} {self.rate}"


class Hero(AbstractUser):
    description = models.TextField()
    age = models.IntegerField(default=0)
    gender = models.CharField(max_length=1)
    power = models.TextField(db_index=True)
    image = models.ImageField(upload_to="images/")
    name = models.CharField(max_length=60, db_index=True)

    @property
    def rate(self):
        return self.rates.aggregate(models.Avg("rate")).get("rate__avg") or 0

    class Meta:
        ordering = ("name",)
