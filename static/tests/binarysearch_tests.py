def correct_binary_search(array, target):
    midpoint_index = len(array) // 2
    midpoint = array[midpoint_index]
    if midpoint == target:
        return midpoint_index
    if len(array) < 2:
        return -1
    if target < midpoint:
        return correct_binary_search(array[0:midpoint_index], target)
    elif target > midpoint:
        result = correct_binary_search(array[(midpoint_index + 1):], target)
        return -1 if result == -1 else result + midpoint_index + 1


def test_results(binary_search):
    test_arrays = [[1, 2, 3, 4, 5, 6, 7], [], [1, 3, 4, 7], [1, 2, 3, 4, 5],
                   [1, 2]]
    test_targets = [3, 3, 1, 9, 0]
    test_results = []

    for i, array in enumerate(test_arrays):
        test_results.append(
            binary_search(array, test_targets[i]) == correct_binary_search(
                array, test_targets[i]))
    return test_results
