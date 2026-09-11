from django.contrib.auth.models import User

from django.contrib.auth import authenticate

from rest_framework import serializers

from recipe_app.models import Recipe


class RegisterSerializer(
    serializers.Serializer
):

    first_name = serializers.CharField()

    last_name = serializers.CharField()

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True
    )


    def validate_email(self, value):

        if User.objects.filter(
            email=value
        ).exists():

            raise serializers.ValidationError(
                "A user with this email already exists."
            )

        return value


    def create(self, validated_data):

        user = User.objects.create_user(

            username=validated_data["email"],

            email=validated_data["email"],

            password=validated_data["password"],

            first_name=validated_data["first_name"],

            last_name=validated_data["last_name"]

        )

        return user


class LoginSerializer(
    serializers.Serializer
):

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True
    )


    def validate(self, data):

        user = authenticate(

            username=data["email"],

            password=data["password"]

        )

        if user is None:

            raise serializers.ValidationError(
                "Invalid email or password."
            )

        data["user"] = user

        return data


class RecipeSerializer(
    serializers.ModelSerializer
):

    creator = serializers.CharField(
        source="user.first_name",
        read_only=True
    )

    creator_id = serializers.IntegerField(
        source="user.id",
        read_only=True
    )


    class Meta:

        model = Recipe

        fields = [

            "id",
            "title",
            "creator",
            "creator_id",
            "ingredients",
            "steps",
            "cooking_time",
            "difficulty_level",
            "image",
            "view_count",

        ]


class ProfileSerializer(
    serializers.ModelSerializer
):

    email = serializers.EmailField(
        read_only=True
    )

    recipes = serializers.SerializerMethodField()


    class Meta:

        model = User

        fields = [

            "first_name",
            "email",
            "recipes",

        ]


    def get_recipes(self, user):

        recipes = Recipe.objects.filter(
            user=user
        )

        return RecipeSerializer(
            recipes,
            many=True
        ).data


class ChangePasswordSerializer(
    serializers.Serializer
):

    current_password = serializers.CharField(
        write_only=True
    )

    new_password = serializers.CharField(
        write_only=True
    )


    def validate(self, data):

        user = self.context["request"].user

        if not user.check_password(
            data["current_password"]
        ):

            raise serializers.ValidationError(

                {
                    "current_password":
                        "Current password is incorrect."
                }

            )


        if (
            data["current_password"]
            == data["new_password"]
        ):

            raise serializers.ValidationError(

                {
                    "new_password":
                        "New password must be different."
                }

            )


        return data