<<<<<<< HEAD
def calculate_streak(habit_checkins):
=======
notepad src/app.py
>>>>>>> 6078801 (refactor(streak): add type hints to signature)
    """Серия (streak) выполнения привычки, максимум 365 дней."""
    streak = 0

    for done in reversed(check_ins):
        if not done:
            break
        streak += 1

def calculate_streak(check_ins):
    """Серия (streak) выполнения привычки, максимум 365 дней."""
    streak = 0

    for done in reversed(check_ins):
        if not done:
            break
        streak += 1

    streak = min(streak, 365)
    print(f"Текущая серия: {streak}")

    return streak