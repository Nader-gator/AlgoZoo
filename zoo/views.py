from django.shortcuts import render

def home(request):
  return render(request, 'zoo/home.html')

def bubble_sort(request):
  return render(request, 'zoo/bubblesort.html')