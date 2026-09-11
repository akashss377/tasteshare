from rest_framework import status
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from recipe_app.models import Recipe
from .serializers import RegisterSerializer, LoginSerializer ,RecipeSerializer , ProfileSerializer , ChangePasswordSerializer
from rest_framework.authtoken.models import Token
from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import IsAuthenticated
@api_view(["POST"])
def register(request):

    serializer = RegisterSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(

            {
                "message":
                    "Registration successful."
            },

            status=status.HTTP_201_CREATED

        )

    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST

    )
@api_view(["POST"])
def login(request):

    serializer = LoginSerializer(
        data=request.data
    )

    if not serializer.is_valid():

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )

    user = serializer.validated_data["user"]

    token, created = Token.objects.get_or_create(
        user=user
    )

    return Response(

        {
            "token": token.key
        },

        status=status.HTTP_200_OK

    )  
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):

    request.auth.delete()

    return Response(

        {
            "message":
                "Logout successful."
        },

        status=status.HTTP_200_OK

    ) 
@api_view(["GET", "POST"])
def recipe_list(request):

    if request.method == "GET":

        recipes = Recipe.objects.all()

        search = request.GET.get(
            "search"
        )

        if search:

            recipes = recipes.filter(

                Q(title__icontains=search) |
                Q(ingredients__icontains=search)

            )

        serializer = RecipeSerializer(
            recipes,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    if request.method == "POST":

        if not request.user.is_authenticated:

            return Response(

                {
                    "detail":
                        "Authentication credentials were not provided."
                },

                status=status.HTTP_401_UNAUTHORIZED

            )

        serializer = RecipeSerializer(
            data=request.data
        )

        if serializer.is_valid():

            recipe = serializer.save(
                user=request.user
            )

            return Response(

                RecipeSerializer(
                    recipe
                ).data,

                status=status.HTTP_201_CREATED

            )

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )
@api_view(["GET", "PUT", "DELETE"])
def recipe_detail(request, id):

    recipe = get_object_or_404(
        Recipe,
        id=id
    )

    if request.method == "GET":

        recipe.view_count += 1

        recipe.save(
            update_fields=["view_count"]
        )

        serializer = RecipeSerializer(
            recipe
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    if request.method == "PUT":

        if not request.user.is_authenticated:

            return Response(
                {
                    "detail":
                    "Authentication credentials were not provided."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        if recipe.user != request.user:

            return Response(
                {
                    "detail":
                    "You can only edit your own recipes."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = RecipeSerializer(
            recipe,
            data=request.data
        )

        if serializer.is_valid():

            recipe = serializer.save()

            return Response(
                RecipeSerializer(recipe).data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    if request.method == "DELETE":

        if not request.user.is_authenticated:

            return Response(
                {
                    "detail":
                    "Authentication credentials were not provided."
                },
                status=status.HTTP_401_UNAUTHORIZED
            )

        if recipe.user != request.user:

            return Response(
                {
                    "detail":
                    "You can only delete your own recipes."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        recipe.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def recipe_create(request):

    serializer = RecipeSerializer(
        data=request.data
    )

    if serializer.is_valid():

        recipe = serializer.save(
            user=request.user
        )

        return Response(

            RecipeSerializer(
                recipe
            ).data,

            status=status.HTTP_201_CREATED

        )

    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST

    )   
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def recipe_update(request, id):

    recipe = get_object_or_404(
        Recipe,
        id=id
    )

    if recipe.user != request.user:

        return Response(

            {
                "detail":
                    "You can only edit your own recipes."
            },

            status=status.HTTP_403_FORBIDDEN

        )

    serializer = RecipeSerializer(

        recipe,

        data=request.data

    )

    if serializer.is_valid():

        recipe = serializer.save()

        return Response(

            RecipeSerializer(
                recipe
            ).data,

            status=status.HTTP_200_OK

        )

    return Response(

        serializer.errors,

        status=status.HTTP_400_BAD_REQUEST

    )
@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def profile(request):

    user = request.user

    if request.method == "GET":

        serializer = ProfileSerializer(
            user
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    if request.method == "PUT":

        serializer = ProfileSerializer(
            user,
            data=request.data
        )

        if not serializer.is_valid():

            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer.save()

        return Response(
            {
                "message":
                    "Profile updated successfully."
            },
            status=status.HTTP_200_OK
        )      
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def change_password(request):

    serializer = ChangePasswordSerializer(

        data=request.data,

        context={
            "request": request
        }

    )

    if not serializer.is_valid():

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )

    user = request.user

    user.set_password(
        serializer.validated_data[
            "new_password"
        ]
    )

    user.save()

    return Response(

        {
            "message":
                "Password updated successfully."
        },

        status=status.HTTP_200_OK

    )         