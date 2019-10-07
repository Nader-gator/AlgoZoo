from django.db import models
from django.contrib.auth.models import User
from coderunner.static.EPIproblems import FILE_NAMES
from coderunner.score_model import (
    LastSolveModel,
    StreakBonus,
    DoubleBonus,
    SpeedBonus
)
from datetime import date, timedelta

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

solved_statuses = [True, False, False, True, True]
solve_dates_days_ago = [0, 3, 4, 10, 20]
solve_time = [10, 11, 12, 20, 21]


class ScoringModels():
    SCORING_CLASSES = {
        LastSolveModel: f'Points based on how long since last solve,\
        MAX={LastSolveModel.MAX_POINTS}',
        StreakBonus: f'Points based on how many times in a row \
        problems been solved, MAX={StreakBonus.MAX_POINTS}',
        DoubleBonus: f'Points based on how much time elapsed between \
        current solve and last solve, MAX={DoubleBonus.MAX_POINTS}',
        SpeedBonus: f'Points based on if there has been at least \
        a {SpeedBonus.THRESHHOLD}% improvment in solve time, MAX={SpeedBonus.MAX_POINTS}',
    }
    MAX_POINTS = sum([clss.MAX_POINTS for clss, label in SCORING_CLASSES.items()])

    testing_objects = [{
        'solved': status,
        'date': date.today()-timedelta(days=solve_dates_days_ago[i]),
        'solve_time': solve_time[i]
    } for i, status in enumerate(solved_statuses)]

    @classmethod
    def get_sum_points(cls, records):
        return sum(
            [clss.get_points(records) for clss, label in cls.SCORING_CLASSES.items()]
        )

    @classmethod
    def get_points_breakdown(cls, records):
        return {
            label: clss.get_points(records) for clss, label in cls.SCORING_CLASSES.items()
        }

    @classmethod
    def debug(cls, records):
        return {
            clss.__qualname__: clss.get_points(records) for clss, label in cls.SCORING_CLASSES.items()
        }


class Test(models.Model):
    title = models.CharField(max_length=100)
    category = models.CharField(max_length=2, choices=CAT_CHOICES, default=CAT_CHOICES[0])
    description = models.TextField()
    file_name = models.CharField(max_length=100, choices=Test_names, default=Test_names[0])
    user = models.ForeignKey(to=User, null=True, blank=True, on_delete=models.CASCADE)
