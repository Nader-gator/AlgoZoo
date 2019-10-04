from django.urls import path
from . import views
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as AuthViews

urlpatterns = [
    path('', views.home, name='coderunner'),
    path('test/<int:code_id>/', views.code_display, name='code_display'),
    path('result/<int:code_id>/', views.result, name='results'),
    path('register-test', views.add_new_test, name='add_test'),
    path('register/', views.register, name='register'),
    path('login/', AuthViews.LoginView.as_view(
        template_name='coderunner/register.html'),
        name='login'),
    path('logout/', AuthViews.LogoutView.as_view(next_page='coderunner'),
         name='logout'),
    path('profile/', views.profile),
]
