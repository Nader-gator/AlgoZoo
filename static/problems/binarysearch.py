#write a method that finds the index of target in an array
#it should return -1 if target doesn't exist in the array
#do not change the name of this function
def answer(array, target):
    #answer here
    return


# hint hint, the answer is:(uncomment with cmd+/ in mac or Ctr+/ in windows)
# def answer(array, target):
#     if len(array) < 1:
#       return -1
#     midpoint_index = len(array) // 2
#     midpoint = array[midpoint_index]
#     if midpoint == target:
#         return midpoint_index
#     if target < midpoint:
#         return answer(array[0:midpoint_index], target)
#     elif target > midpoint:
#         result = answer(array[(midpoint_index + 1):], target)
#         return -1 if result == -1 else result + midpoint_index + 1
