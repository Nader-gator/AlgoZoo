from math import log
from datetime import date, timedelta


class SharedMethods:

    # MAIN GETTER
    @classmethod
    def get_points(cls, records):
        return cls._get_points_from_records(records)

    # PRIVATE CHANGING METHODS
    @classmethod
    def _record_is_solved(cls, record):
        return record['solved']

    @classmethod
    def _get_record_solve_day(cls, record):
        if cls.record_is_solved(record):
            return record['date']
        else:
            return False

    @classmethod
    def _get_solve_duration(cls, record):
        if cls.record_is_solved(record):
            return record['solve_time']
        else:
            return False

    # Non private, only calls private
    @classmethod
    def record_is_solved(cls, record):
        return cls._check_tuple(record, cls._record_is_solved)

    @classmethod
    def get_record_solve_day(cls, record):
        return cls._check_tuple(record, cls._get_record_solve_day)

    @classmethod
    def get_solve_duration(cls, record):
        return cls._check_tuple(record, cls._get_solve_duration)

    # check and handle tuple inputs

    @classmethod
    def _check_tuple(cls, record, callback):
        if isinstance(record, tuple):
            return cls._handle_tuple(record, callback)
        else:
            return callback(record)

    @classmethod
    def _handle_tuple(cls, record, callback):
        collection = tuple()
        for item in record:
            collection += (callback(item),)
        return collection


class LastSolveModel(SharedMethods):

    ZONES = [
        (range(0 * 7, 2 * 7), 0.1),
        (range(2 * 7, 4 * 7), 0.3),
        (range(4 * 7, 6 * 7), 5),
        (range(6 * 7, 9 * 7), 10),
        [70, 1]
    ]
    TOP = 60
    MAX_POINTS = 120

    @classmethod
    def _find_running_sum(cls, break_value=None):
        running_sum = 1
        last = cls.ZONES[-1][0]
        last_mod = cls.ZONES[-1][1]
        if break_value > last:
            extras = break_value - last
        else:
            extras = None

        for zone, value in cls.ZONES[:-1]:
            for i in zone:
                running_sum += (1 * value)
                if i == break_value:
                    return running_sum

        if extras:
            for i in range(extras):
                running_sum += (1 * last_mod)
        return running_sum

    @classmethod
    def _model(cls, day, max_day):
        if not day < max_day:
            return 0
        if day < 4:
            return 1
        day -= 4

        mday = cls._find_running_sum(break_value=day)
        mmax = cls._find_running_sum(break_value=max_day)

        return (1 - log(mday, mmax))

    @classmethod
    def _get_points_from_day(cls, day):
        point_cooef = cls._model(day, cls.TOP)
        if point_cooef <= 1:
            return point_cooef * cls.MAX_POINTS
        else:
            return cls.MAX_POINTS

    @classmethod
    def _get_points_from_records(cls, records):
        for record in records[::-1]:
            solve_date = cls.get_record_solve_day(record)
            if solve_date:
                today = date.today()
                delta = today - solve_date
                return cls._get_points_from_day(delta.days)
        return 0


class StreakBonus(SharedMethods):
    BONUS_ZONE = {
        1: 1,
        2: 2.5,
        3: 5,
        'max': 3
    }
    MAX_POINTS = 40
    BASE = MAX_POINTS / max(BONUS_ZONE.values())

    @classmethod
    def _get_solvess(cls, records):
        # assuming sorted
        num_solves = 0
        for record in records[::-1]:
            if cls.record_is_solved(record):
                num_solves += 1
            else:
                return num_solves
        return num_solves

    @classmethod
    def _get_points_from_records(cls, records):
        solves = cls._get_solvess(records) - 1
        zone_max = cls.BONUS_ZONE['max']
        if solves >= zone_max:
            return cls.BONUS_ZONE[zone_max] * cls.BASE
        else:
            return cls.BONUS_ZONE.get(solves, 0) * cls.BASE


class DoubleBonus(SharedMethods):
    BONUS_ZONE = {
        range(7+1): 0,
        range(7+1, (7*2)+1): 1,
        range((7*2)+1, (7*5)): 2.5,
        'max_val': 5,
    }
    MAX_POINTS = 20
    BASE = MAX_POINTS / max(BONUS_ZONE.values())

    @classmethod
    def _get_days(cls, records):
        # assuming sorted, input: Datetime
        if len(records) < 2:
            return 0
        last_record = records[-1]
        s_last_record = records[-2]
        last_date, s_last_date = cls.get_record_solve_day((
            last_record, s_last_record
        ))
        if not all((last_date, s_last_date)):
            return 0

        time_delta = last_date - s_last_date
        return max(time_delta.days, 0)

    @classmethod
    def _get_points_from_records(cls, records):
        days_passed = cls._get_days(records)
        if days_passed <= 0:
            return 0
        for day_range, multiplier in cls.BONUS_ZONE.items():
            if days_passed in day_range:
                return multiplier * cls.BASE

        return cls.BONUS_ZONE['max_val'] * cls.BASE


class SpeedBonus(SharedMethods):
    THRESHHOLD = 20
    MAX_POINTS = 20

    @classmethod
    def _get_last_time_diff(cls, records):
        last_solve = None
        s_last_solve = None
        for record in records[::-1]:
            solve_time = cls.get_solve_duration(record)
            if solve_time:
                if not last_solve:
                    last_solve = solve_time
                else:
                    s_last_solve = solve_time
                    break
        if s_last_solve and last_solve:
            difference = s_last_solve - last_solve
            return (difference / last_solve)*100
        else:
            return 0

    @classmethod
    def _get_points_from_records(cls, records):
        last_t_diff = cls._get_last_time_diff(records)
        if last_t_diff >= cls.THRESHHOLD:
            return cls.MAX_POINTS
        else:
            return 0
