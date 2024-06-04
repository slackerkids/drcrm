from rest_framework import serializers
from .models import User, Customer, Lead, Interaction


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "department", "role", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            department=validated_data['department'],
            role=validated_data['role']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"



class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = "__all__"



class InteractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Interaction
        fields = "__all__"