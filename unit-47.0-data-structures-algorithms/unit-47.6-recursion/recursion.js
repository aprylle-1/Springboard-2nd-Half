/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  if (i === nums.length) return 1
  
  return nums[i] * product(nums, i + 1)
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, i = 0, word = "") {
  if (i === words.length) return word.length
  let currentLongest = word
  if (words[i].length > word.length){
    currentLongest = words[i]
  }
  return longest(words, i = i + 1, currentLongest)
}

/** everyOther: return a string with every other letter. */

function everyOther(str, i = 0) {
  if (i >= str.length) return ""
  
  return str[i] + everyOther(str, i + 2)
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, i = str.length - 1, reversed = ""){
  if (i < 0) return reversed === str
 
  const reverse = reversed + str[i]
  return isPalindrome(str, i = i - 1, reverse)
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex (arr, val, i = 0){
  if (arr[i] === val){
    return i
  }
  else if (i === arr.length - 1){
    return -1
  }
  return findIndex(arr, val, i = i + 1)
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, i = str.length - 1, reversed = ""){
  if (i < 0) return reversed
  
  reverse = reversed + str[i]
  return revString(str, i = i - 1, reverse)
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, strings = []){
  let currentStrings = [...strings]
  for (let item in obj){
    if(typeof obj[item] === "object"){
      const strings = gatherStrings(obj[item], currentStrings)
      currentStrings = [...strings]
    }
    else if(typeof obj[item] === "string"){
      currentStrings.push(obj[item])
    }
  }
  return currentStrings
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left = 0, right = arr.length - 1){
  const middle = Math.floor((left + right)/2)
  if (arr[middle] === val){
    return middle
  }
  else if (left >= right){
    return -1
  }
  else {
    let newLeft = left
    let newRight = right
    if(arr[middle] <= val){
      newLeft = middle + 1
    }
    else {
      newRight = middle - 1
    }
    return binarySearch(arr, val, newLeft, newRight)
  }
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
