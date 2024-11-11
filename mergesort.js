function merge(left, right) {
  let sorted = [];
  /* ??? */
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      sorted.push(left.shift());
    } else {
      sorted.push(right.shift());
    }
  }
  return sorted.concat(left.concat(right));
  /* profit */
}

export function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }
  let middle = Math.floor(array.length / 2);

  let left = mergeSort(array.slice(0, middle));
  let right = mergeSort(array.slice(middle));

  return merge(left, right);
}

let needSorting = [9, 7, 3, 4, 6, 1, 2];

/* console.log(merge([1, 2, 3], [2, 3, 4])); */
