from django.shortcuts import render
from .models import Test
import os, imp
from django.conf import settings
from django.urls import reverse
from django.http import HttpResponseRedirect


def home(request):
    tests = Test.objects.all()
    context = {'tests': tests}
    return render(request, 'coderunner/home.html', context)


def code_display(request, code_id):
    test = Test.objects.get(id=code_id)
    test_path = os.path.join(settings.STATIC_ROOT,
                             f"problems/{test.file_name}")
    test_file = open(test_path, 'r').readlines()
    context = {'problem': ''.join(test_file), 'test': test, 'id': test.id}
    return render(request, 'coderunner/test.html', context)


def result(request, code_id):
    if request.method == 'GET':
        return HttpResponseRedirect(reverse('coderunner'))

    answer = request.POST.get('answer')
    answer_module = imp.new_module('answer_module')
    exec(answer, answer_module.__dict__)
    answer_function = answer_module.answer

    test = Test.objects.get(id=code_id)
    test_path = os.path.join(settings.STATIC_ROOT, f"tests/{test.test_name}")
    test_file = open(test_path, 'r').readlines()
    test_text = ''.join(test_file)

    test_module = imp.new_module('test_module')
    exec(test_text, test_module.__dict__)
    test_function = test_module.test_results

    results = test_function(answer_function)

    return render(request, 'coderunner/result.html')
