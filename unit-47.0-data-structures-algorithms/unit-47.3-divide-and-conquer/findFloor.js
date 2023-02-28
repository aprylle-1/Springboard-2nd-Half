function findFloor(arr, val){
    let left = 0
    let right = arr.length - 1
    let middle = Math.floor((left + right)/2)
    while (left <= right){
      if (arr[middle] >= val){
        right = middle - 1
      }
      else if (arr[middle] < val && arr[right] < val){
        left = middle + 1
      }
      middle = Math.floor((left + right)/2)
    }
    if (arr[middle] < val){
      return arr[middle]
    }
    else {
      return -1
    }
}

module.exports = findFloor