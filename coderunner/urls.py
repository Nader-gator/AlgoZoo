from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='coderunner'),
    path('test/<int:code_id>/', views.code_display, name='code_display'),
    path('result/<int:code_id>/', views.result, name='results')
]
