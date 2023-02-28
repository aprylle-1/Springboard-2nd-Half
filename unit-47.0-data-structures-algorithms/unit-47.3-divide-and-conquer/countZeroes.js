function countZeroes(arr) {
  let left = 0
  let right = arr.length - 1
  let middle = Math.floor((right + left)/2)
  
  while (left <= right) {
    if (arr[middle] === 1) {
      left = middle + 1
    }
    else if (arr[middle] === 0){
      if (arr[middle - 1] === 1 || middle === 0){
        return (arr.length - middle)
      }
      else {
        right = middle - 1
      }
    }
    middle = Math.floor((right + left)/2)
  }
  return 0
}

module.exports = countZeroes