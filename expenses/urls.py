from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('add-expense', views.add_expenses, name='add_expense'),
]