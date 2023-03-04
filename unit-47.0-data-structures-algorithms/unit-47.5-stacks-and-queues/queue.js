/** Node: node for a queue. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Queue: chained-together nodes where you can
 *  remove from the front or add to the back. */

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** enqueue(val): add new value to end of the queue. Returns undefined. */

  enqueue(val) {
    const node = new Node(val)
    if (this.size === 0){
      this.first = node
    }
    else if (this.size == 1){
      this.first.next = node
    }
    else {
      this.last.next = node
    }
    this.last = node
    this.size += 1
  }

  /** dequeue(): remove the node from the start of the queue
   * and return its value. Should throw an error if the queue is empty. */

  dequeue() {
    const node = this.first
    if (this.size === 0){
      throw new Error("Qeueu is empty. Cannot perform dequeue process")
    }
    else if (this.size === 1){
      this.first = null
      this.last = null
    }
    else {
      this.first = this.first.next
    }
    this.size -= 1
    return node.val
  } 

  /** peek(): return the value of the first node in the queue. */

  peek() {
    if (this.size === 0){
      throw new Error("Queue is empty")
    }
    else {
      return this.first.val
    }
  }

  /** isEmpty(): return true if the queue is empty, otherwise false */

  isEmpty() {
    return this.size === 0
  }
}

module.exports = Queue;
