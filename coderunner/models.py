from django.db import models
from django.contrib.auth.models import User
from coderunner.static.EPIproblems import FILE_NAMES

CAT_CHOICES = [
    ('PR', 'Primitive'),
    ('AR', 'Array'),
    ('SR', 'String'),
    ('LL', 'Linked Lists'),
    ('SQ', 'Stacks and Queues'),
    ('BT', 'Binary Trees'),
    ('HP', 'Heaps'),
    ('SC', 'Searching'),
    ('HT', 'Hash Tables'),
    ('ST', 'Sorting'),
    ('BS', 'Binary Search Trees'),
    ('RC', 'Recursion'),
    ('DY', 'Dynamic Programming'),
    ('GA', 'Greedy Algorithms'),
    ('GR', 'Graphs'),
    ('PC', 'Parallel Computing'),
]
unwanted_names = {'__init__.py', '__pycache__'}
Test_names = [(f"{index}", name)
              for index, name in enumerate(FILE_NAMES) if name not in unwanted_names]


class Test(models.Model):
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=2, choices=CAT_CHOICES, default=CAT_CHOICES[0])
    description = models.TextField()
    file_name = models.CharField(max_length=100, choices=Test_names, default=Test_names[0])
    user = models.ForeignKey(to=User, null=True, blank=True, on_delete=models.CASCADE)
