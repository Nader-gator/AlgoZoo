from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='zoo-home'),
    path('bubblesort', views.bubble_sort, name='bubble-sort'),
    path('quicksort', views.quick_sort, name='quick-sort'),
    path('mergesort', views.merge_sort, name='merge-sort'),
    path('bsearch', views.bsearch, name='bsearch'),
    path('binarytree', views.binarytree, name='binary-tree')
]
