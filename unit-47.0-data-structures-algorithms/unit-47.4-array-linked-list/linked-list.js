/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const node = new Node(val)

    /*When the LinkedList starts as an empty List, head and tail will be the same node*/
    if(this.length === 0){
      this.head = node
      this.tail = node
    }
    /**Otherwise, set the next of the current tail to the new node and then set the tail to the new node */
    else{
    /**When the linkedList only has one value, set the next of the head to the new node */
      if (this.length === 1){
        this.head.next = node
      }
      this.tail.next = node
      this.tail = node
    }
    this.length += 1
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const node = new Node(val)
    if(!this.tail && !this.head){
      this.head = node
      this.tail = node
    }
    else{
      node.next = this.head
      this.head = node
    }
    this.length += 1
  }

  /** pop(): return & remove last item. */

  pop() {
    let currentNode = this.head
    let poppedNode
    if (this.length === 0){
      throw new Error ("Cannot remove item in from an empty LinkedList")
    }

    if (this.length === 1){
      poppedNode = this.head
      this.head = null
      this.tail = null
    }
    else{
      /**Checking for the 2nd to the last node
     * 
     * If the next value of the next value of the current node is null that means the
     * next value is the last item in the least
     */
      while(currentNode.next.next){
        currentNode = currentNode.next
      }
      if (this.length === 2){
        this.tail = currentNode
      }
      poppedNode = currentNode.next
      currentNode.next = null
    }
    /**
     * poppedNode is the next code of the 2nd to the last node -- meaning it is the last node
     */
    

    this.length -= 1
    
    return poppedNode.val
  }

  /** shift(): return & remove first item. */

  shift() {
    const currentHead = this.head
    if(this.length === 0){
      throw new Error("Cannot remove item from an empty LinkedList")
    }
    else if (this.length === 1){
      this.head = null
      this.tail = null
    }
    else if (this.length === 2){
      this.head = currentHead.next
      this.tail = this.head
    }
    else {
      this.head = currentHead.next
    }
    this.length -= 1
    return currentHead.val
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let current = this.head
    if (idx > this.length - 1){
      throw new Error(`Invalid index. Cannot find item at index ${idx} of LinkedList with length ${this.length}`)
    }
    else {
      for (let count = 0; count < this.length; count++){
        if (count === idx){
          return current.val
        }
        else {
          current = current.next
        }
      }
    }
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let current = this.head
    if (idx > this.length - 1){
      throw new Error(`Invalid index. Cannot find item at index ${idx} of LinkedList with length ${this.length}`)
    }
    else {
      for (let count = 0; count < this.length; count++){
        if (count === idx){
          current.val = val
        }
        else {
          current = current.next
        }
      }
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let current = this.head
    let node = new Node(val)
    if (idx > this.length && idx !== 0){
      throw new Error(`Invalid index. Cannot insert item at index ${idx} of LinkedList with length ${this.length}`)
    }
    else if (idx === 0){
      this.unshift(val)
    }
    else if (idx === this.length){
      console.log('reached')
      this.push(val)
    }
    else {
      for (let count = 0; count < idx; count++){
        if (count === idx - 1){
          node.next = current.next
          current.next = node
        }
        else{
          current = current.next
        }
      }
      this.length += 1
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    let current = this.head

    if ((idx >= this.length && idx !== 0) || (idx < 0)){
      throw new Error(`Invalid index. Cannot remove item at index ${idx} of LinkedList with length ${this.length}`)
    }
    else if (idx === 0){
      return this.shift()
    }
    else if (idx === this.length - 1){
      return this.pop()
    }
    else {
      for (let count = 0; count < idx; count ++){
        if (count === idx - 1){
          const value = current.next.val
          current.next = current.next.next
          this.length -= 1
          return value
        }
        else{
          current = current.next
        }
      }
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0){
      return 0
    }
    else {
      let sum = 0
      let currentNode = this.head
      while(currentNode){
        sum += currentNode.val
        currentNode = currentNode.next
      }
      return sum/this.length
    }
  }
}

module.exports = LinkedList;

// const newList = new LinkedList ([5,10])

// try{
//   console.log(newList.getAt(10))
// }
// catch(err){
//   console.log(err.message)
// }

// let lst = new LinkedList();

// lst.insertAt(0, 12);
// lst.insertAt(0, 15);
// lst.insertAt(2, 29);
// lst.insertAt(3, 65);

// let currentNode = lst.head
// console.log(lst)
// while(currentNode){
//   console.log(currentNode.val)
//   currentNode = currentNode.next
// }

// let lst = new LinkedList([5, 10, 15, 20]);

// lst.insertAt(2, 12);

// let currentNode = lst.head
// console.log(lst)
// while(currentNode){
//   console.log(currentNode.val)
//   currentNode = currentNode.next
// }

// let lst = new LinkedList([5,10,15,20,25]);
// x = lst.removeAt(2)

// let currentNode = lst.head
// while(currentNode){
//   console.log(currentNode.val)
//   currentNode = currentNode.next
// }