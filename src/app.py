"""Core streak calculation for Habit Tracker."""


def calculate_streak(habit_checkins: list[bool]) -> int:
    """Return the number of consecutive successful check-ins at the end.

    The streak is capped at 365 days. A failed check-in breaks the streak.
    """
    streak = 0
    for completed in reversed(habit_checkins):
        if not completed:
            break
        streak += 1
    return min(streak, 365)
