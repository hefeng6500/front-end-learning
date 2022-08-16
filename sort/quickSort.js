function quickSort(nums) {
  return quick(nums, 0, nums.length - 1);
}

function quick(nums, begin, end) {
  if (end <= begin) return;

  const pivot = partition(nums, begin, end);

  quick(nums, begin, pivot - 1);
  quick(nums, pivot + 1, end);

  return nums;
}

function partition(nums, begin, end) {
  let pivot = end;
  let i = begin;

  for (let j = begin; j < end; j++) {
    if (nums[j] < nums[pivot]) {
      swap(nums, i, j);
      i++;
    }
  }
  swap(nums, i, pivot);

  return i;
}

function swap(nums, a, b) {
  const temp = nums[a];
  nums[a] = nums[b];
  nums[b] = temp;
}

console.log(quickSort([5, 2, 3, 99, 1]));
