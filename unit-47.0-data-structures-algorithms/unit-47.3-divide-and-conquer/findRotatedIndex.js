function findPivotIndex(arr){
    let left = 0
    let right = arr.length - 1
    
      while (left <= right){
      let middle = Math.floor((right + left)/2)
      if (arr[middle] > arr[middle - 1] && arr[middle] > arr[middle + 1] ){
        return middle
      }
      else if (arr[middle] < arr[middle + 1] && arr[middle] < arr[middle - 1]){
        return middle - 1
      }
      else if (arr[middle] > arr[left]){
        left = middle + 1
      }
      else if (arr[middle] < arr[left]){
        right = middle - 1
      }
     }
  }

function findVal(arr, val, start, end){
  let left = start
  let right = end
  
  while (left <= right){
    let middle = Math.floor((left + right)/2)
    if(arr[middle] === val){
      return middle
    }
    else if (arr[middle] < val){
      left = middle + 1
    }
    else {
      right = middle - 1
    }
  }
  return -1
}

function findRotatedIndex(arr, val){
    const pivot = findPivotIndex(arr)
    const left = findVal(arr, val, 0, pivot)
    const right = findVal(arr, val, pivot + 1, arr.length - 1)
    if (right > 0){
      return right
    }
    else if (left > 0){
      return left
    }
    else {
      return -1
    }
}

module.exports = findRotatedIndex