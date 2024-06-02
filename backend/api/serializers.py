from rest_framework import serializers
from .models import User, Customer, Lead, Interaction


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "department", "role"]
        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }


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