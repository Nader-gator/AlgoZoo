from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from django.forms import ModelForm
from .models import Test, Solution


class NewUserForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class NewProblemForm(ModelForm):

    class Meta:
        model = Test
        fields = ['title', 'category', 'description', 'file_name', ]


class NewSolutionForm(ModelForm):

    class Meta:
        model = Solution
        fields = ['solved', 'solution']
