from django.contrib import admin
from .models import User, Customer, Lead, Interaction

admin.site.register(User)
admin.site.register(Customer)
admin.site.register(Lead)
admin.site.register(Interaction)
