from rest_framework.permissions import BasePermission


class IsSuperHero(BasePermission):
    """
    Custom permission class to check if the user is a superhero.
    """

    def has_permission(self, request, view):
        return (
            request.user and request.user.is_authenticated and request.user.is_superuser
        )
