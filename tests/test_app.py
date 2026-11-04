from src.app import calculate_streak


def test_all_done_full_streak():
    assert calculate_streak([True, True, True]) == 3


def test_streak_breaks_on_false():
    assert calculate_streak([True, False, True, True]) == 2


def test_empty_history_is_zero():
    assert calculate_streak([]) == 0


def test_streak_is_capped_at_365():
    assert calculate_streak([True] * 400) == 365


def test_last_checkin_false_means_zero():
    assert calculate_streak([True, True, False]) == 0


def test_single_success():
    assert calculate_streak([True]) == 1
