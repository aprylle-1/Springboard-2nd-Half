function findLeft(arr, val) {
    let left = 0
    let right = arr.length - 1
    let middle = Math.floor((left + right)/2)
    
    while (left <= right) {
      if (arr[middle] === val && (arr[middle - 1] !== val || middle === 0)){
        return middle
      }
      else if (arr[middle] === val){
        right = middle - 1
      }
      else if (arr[middle] > val){
        right = middle - 1
      }
      else if (arr[middle] < val){
        left = left + 1
      }
      middle = Math.floor((left + right)/2)
    }
    return -1
}
  
function findRight(arr, val) {
    let left = 0
    let right = arr.length - 1
    let middle = Math.floor((left + right)/2)
    
    while (left <= right) {
      if (arr[middle] === val && (arr[middle + 1] !== val || middle === arr.length - 1)){
        return middle
      }
      else if (arr[middle] === val){
        left  = middle + 1
      }
      else if (arr[middle] > val){
        right -=1
      }
      else if (arr[middle] < val){
        left = middle + 1
      }
      middle = Math.floor((left + right)/2)
    }
    return -1
}

function sortedFrequency(arr,val){
    const left = findLeft(arr,val)
    if (left === -1){
        return -1
    }
    const right = findRight(arr,val)
    return right - left + 1
}

module.exports = sortedFrequency