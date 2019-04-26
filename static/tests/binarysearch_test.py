def correct_binary_search(array, target):
    if len(array) < 1:
        return -1
    midpoint_index = len(array) // 2
    midpoint = array[midpoint_index]
    if midpoint == target:
        return midpoint_index
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
        try:
            test_results.append({
                'result':
                binary_search(array, test_targets[i]) == correct_binary_search(
                    array, test_targets[i]),
                'testcase': {
                    'array': array,
                    'target': test_targets[i]
                },
                'number':
                i + 1
            })
        except Exception as e:
            test_results.append({
                'result': 'Syntax Error: ' + str(e),
                'testcase': array,
                'number': i + 1
            })
    return test_results
