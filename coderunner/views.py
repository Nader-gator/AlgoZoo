from django.shortcuts import render
from .models import Test
import os
import types
from django.conf import settings
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import NewUserForm, NewProblemForm
from django.contrib.auth.decorators import login_required


@login_required
def home(request):
    tests = Test.objects.filter(user=request.user)
    context = {'tests': tests}
    return render(request, 'coderunner/home.html', context)


@login_required
def code_display(request, code_id):
    test = Test.objects.get(id=code_id)
    test_path = os.path.join(settings.STATIC_ROOT,
                             f"EPIproblems/{test.get_file_name_display()}")
    test_file = open(test_path, 'r').readlines()
    context = {'problem': ''.join(test_file), 'test': test, 'id': test.id}
    return render(request, 'coderunner/test.html', context)


@login_required
def result(request, code_id):
    if request.method == 'GET':
        return HttpResponseRedirect(reverse('coderunner'))

    answer = request.POST.get('answer')
    answer_module = types.ModuleType('answer_module')
    try:
        exec(answer, answer_module.__dict__)
    except Exception as e:
        context = {'error': str(e), 'problem': answer, 'id': code_id}
        return render(request, 'coderunner/test.html', context)
    answer_function = answer_module.answer

    test = Test.objects.get(id=code_id)
    test_path = os.path.join(settings.STATIC_ROOT, f"tests/{test.test_name}")
    test_file = open(test_path, 'r').readlines()
    test_text = ''.join(test_file)

    test_module = types.ModuleType('test_module')
    exec(test_text, test_module.__dict__)
    test_function = test_module.test_results

    results = test_function(answer_function)
    context = {'results': results, 'problem': answer, 'id': code_id}
    return render(request, 'coderunner/test.html', context)


def register(request):
    if request.method == 'POST':
        form = NewUserForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f"user created for {username}")
            return redirect('coderunner')
    else:
        form = NewUserForm()
    context = {'form': form}
    return render(request, 'coderunner/register.html', context)


@login_required
def profile(request):
    return render(request, 'users/profile.html')


@login_required
def add_new_test(request):
    if request.method == 'POST':
        form = NewProblemForm(request.POST)
        if form.is_valid():
            problem = form.save(commit=False)
            problem.user = request.user
            problem.save()
            file_name = form.cleaned_data.get('file_name')
            messages.success(request, f"problem created for {file_name}")
            return redirect('coderunner')
    else:
        form = NewProblemForm()
    context = {'form': form}
    return render(request, 'coderunner/add_test.html', context)
