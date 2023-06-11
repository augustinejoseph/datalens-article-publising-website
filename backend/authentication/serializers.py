from rest_framework import serializers
from .models import AllUsers, Interests, UserInterests

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interests
        fields = ["id", "interestName"]


class UserSerializer(serializers.ModelSerializer):
    interests = InterestSerializer(many=True)
    class Meta:
        model = AllUsers
        fields = ['id', 'email', 'password', "first_name", "last_name", "interests"]
        
    def create(self, validated_data):
        password = validated_data.pop("password")
        interests_data = validated_data.pop("interests")
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        for interest_data in interests_data:
            interest = interest_data.pop("interestName")
            interest_obj, _ = Interests.objects.get_or_create(interestName=interest)
            UserInterests.objects.create(user=instance, interest=interest_obj)

        return instance
    