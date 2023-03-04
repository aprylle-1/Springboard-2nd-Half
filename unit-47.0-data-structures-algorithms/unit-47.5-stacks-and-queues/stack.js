/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    const node = new Node(val)
    if (this.size === 0){
      this.last= node
    }
    else {
      node.next = this.first
    }
    this.first = node
    this.size += 1
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    const node = this.first
    if (this.size === 0){
      throw new Error("Stack is empty");
    }
    else if (this.size === 1){
      this.first = null;
      this.last = null;
    }
    this.size -= 1;
    return node.val
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    if (this.size === 0){
      return "Stack is empty"
    }
    return this.first.val
  }

  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    return this.size === 0
  }
}

module.exports = Stack;
