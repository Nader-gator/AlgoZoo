from django.shortcuts import render
from .models import Test, Solution
import os
import types
from django.conf import settings
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from django.contrib import messages
from .forms import NewUserForm, NewProblemForm, NewSolutionForm
from django.contrib.auth.decorators import login_required
import datetime
import random


@login_required
def home(request):
    tests = Test.objects.filter(user=request.user)
    scores = {test: test.get_score() for test in tests}
    score_groups = dict()
    for test, score in scores.items():
        if score in score_groups:
            score_groups[score].append(test)
        else:
            score_groups[score] = [test]
    sorted_scores = sorted(score_groups.keys())
    if sorted_scores:
        random.shuffle(score_groups[sorted_scores[0]])
    tests = dict()
    for score, group in score_groups.items():
        for test in group:
            tests[test] = score
    context = {'tests': tests}
    return render(request, 'coderunner/home.html', context)


@login_required
def code_display(request, code_id):
    if request.method == 'POST':
        record_result(request, code_id)
    test = Test.objects.get(id=code_id)
    test_path = os.path.join(settings.STATIC_ROOT,
                             f"EPIproblems/{test.get_file_name_display()}")
    test_file = open(test_path, 'r').readlines()
    solution_form = NewSolutionForm()
    now = datetime.datetime.today()
    context = {'problem': ''.join(test_file), 'solution_form': solution_form,
               'test': test, 'id': test.id, 'time': f"{now.hour}:{now.minute}"}
    return render(request, 'coderunner/test.html', context)


@login_required
def record_result(request, code_id):
    test = Test.objects.get(id=code_id)
    now = datetime.datetime.today()
    before_time = request.POST.get('time').split(':')
    elapsed_minutes = ((now.hour - int(before_time[0])) * 60) + (now.minute - int(before_time[1]))
    args = {'solved': bool(request.POST.get('solved', None)),
            'solution': request.POST.get('answer', ''),
            'attempt_date': datetime.date.today(),
            'solved_time_minutes': elapsed_minutes,
            'problem': test}
    solution = Solution(**args)
    solution.save()
    messages.success(request, 'solution added')


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
