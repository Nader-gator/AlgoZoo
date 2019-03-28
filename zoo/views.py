from django.shortcuts import render

def home(request):
  return render(request, 'zoo/home.html')

def bubble_sort(request):
  return render(request, 'zoo/bubblesort.html')

def quick_sort(request):
  return render(request,'zoo/quicksort.html')

def merge_sort(request):
  return render(request, 'zoo/mergesort.html')

def bsearch(request):
  return render(request, 'zoo/bsearch.html')