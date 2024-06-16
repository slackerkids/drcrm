from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import (
    UserRegisterView,
    UserProfileView,
    CustomerListView,
    CustomerDetailView,
    LeadListView,
    LeadDetailView,
    InteractionListView,
    InteractionDetailView,
)

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/user/register/", UserRegisterView.as_view(), name="user-register"),
    path("api/user/profile/", UserProfileView.as_view(), name="user-profile"),
    path("api/customers/", CustomerListView.as_view(), name="customer-list"),
    path(
        "api/customers/<int:pk>/", CustomerDetailView.as_view(), name="customer-detail"
    ),
    path("api/leads/", LeadListView.as_view(), name="lead-list"),
    path("api/leads/<int:pk>/", LeadDetailView.as_view(), name="lead-detail"),
    path("api/interactions/", InteractionListView.as_view(), name="interaction-list"),
    path(
        "api/interactions/<int:pk>/",
        InteractionDetailView.as_view(),
        name="interaction-detail",
    ),
]
