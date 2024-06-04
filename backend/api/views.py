from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from .serializers import UserSerializer, CustomerSerializer, LeadSerializer, InteractionSerializer
from .models import User, Customer, Lead, Interaction


class UserRegisterView(APIView):
    """
    Allows a user to register.
    """
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "User created successfully",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    """
    Allows a user to login and get JWT tokens.
    """
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"message": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Login successful",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            })
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileView(APIView):
    """
    Allows an authenticated user to view, update, or delete their profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        request.user.delete()
        return Response({
            "message": "User deleted successfully"
        })


class CustomerListView(APIView):
    """
    Allows authenticated users to list all customers and create a new customer.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerDetailView(APIView):
    """
    Allows authenticated users to view, update, or delete a specific customer.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)
    
    def put(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        customer = get_object_or_404(Customer, pk=pk)
        customer.delete()
        return Response({
            "message": "Customer deleted successfully"
        })


class LeadListView(APIView):
    """
    Allows authenticated users to list all leads and create a new lead.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        leads = Lead.objects.all()
        serializer = LeadSerializer(leads, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = LeadSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LeadDetailView(APIView):
    """
    Allows authenticated users to view, update, or delete a specific lead.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        lead = get_object_or_404(Lead, pk=pk)
        serializer = LeadSerializer(lead)
        return Response(serializer.data)
    
    def put(self, request, pk):
        lead = get_object_or_404(Lead, pk=pk)
        serializer = LeadSerializer(lead, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        lead = get_object_or_404(Lead, pk=pk)
        lead.delete()
        return Response({
            "message": "Lead deleted successfully"
        })


class InteractionListView(APIView):
    """
    Allows authenticated users to list all interactions and create a new interaction.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        interactions = Interaction.objects.all()
        serializer = InteractionSerializer(interactions, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = InteractionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InteractionDetailView(APIView):
    """
    Allows authenticated users to view, update, or delete a specific interaction.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        interaction = get_object_or_404(Interaction, pk=pk)
        serializer = InteractionSerializer(interaction)
        return Response(serializer.data)

    def put(self, request, pk):
        interaction = get_object_or_404(Interaction, pk=pk)
        serializer = InteractionSerializer(interaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        interaction = get_object_or_404(Interaction, pk=pk)
        interaction.delete()
        return Response({
            "message": "Interaction deleted successfully"
        })
