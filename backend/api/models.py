from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    DEPARTMENT_CHOICES = [
        ("blank", ""),
        ("human_resources", "Human Resources"),
        ("sales", "Sales"),
        ("marketing", "Marketing"),
        ("finance", "Finance"),
        ("operations", "Operations"),
        ("development", "Development"),
        ("customer_service", "Customer Service"),
    ]
    
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES, default="blank")
    role = models.CharField(max_length=255)
    

class Customer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Lead(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("contacted", "Contacted"),
        ("qualified", "Qualified"),
        ("unqualified", "Unqualified"),
    ]
    
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Interaction(models.Model):
    INTERACTION_TYPE_CHOICES = [
        ("email", "Email"),
        ("phone", "Phone"),
        ("social_media", "Social Media"),
        ("in_person", "In person")
    ]
    
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True, blank=True)
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, null=True, blank=True)
    interaction_type = models.CharField(max_length=50, choices=INTERACTION_TYPE_CHOICES)
    notes = models.TextField(null=True, blank=True)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
