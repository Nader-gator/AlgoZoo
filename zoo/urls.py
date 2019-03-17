from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='zoo-home'),
    path('bubblesort', views.bubble_sort, name='bubble-sort'),
    path('quicksort', views.quick_sort, name='quick-sort')
]