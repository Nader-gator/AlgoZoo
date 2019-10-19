from coderunner.score_model import (
    LastSolveModel,
    StreakBonus,
    DoubleBonus,
    SpeedBonus
)
from datetime import date, timedelta

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
            clss.__qualname__: clss.get_points(records) for clss, label
            in cls.SCORING_CLASSES.items()
        }
