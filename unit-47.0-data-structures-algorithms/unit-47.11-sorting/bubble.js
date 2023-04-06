function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++){
        for (let j = i + 1; j < arr.length; j++){
            if (arr[j] < arr[i]){
                const temp = arr[j]
                arr[j] = arr[i]
                arr[i] = temp
            }
        }
    }
    return arr
}

module.exports = bubbleSort;