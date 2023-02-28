function findRotationCount(arr){
    let left = 0
    let right = arr.length - 1

    while (left <= right){
        const middle = Math.floor((left + right)/2)

        if (arr[middle] < arr[middle - 1]){
            return middle
        }
        else if (arr[middle] >= arr[left] && arr[middle] >= arr[right]){
            left = middle + 1
        }
        else if (arr[middle] >= arr[left] && arr[middle] <= arr[right]){
            right = middle - 1
        }
    }
    return 0
}
module.exports = findRotationCount