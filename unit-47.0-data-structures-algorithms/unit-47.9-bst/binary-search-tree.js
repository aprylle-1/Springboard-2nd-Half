class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if (this.root === null){
      const node = new Node(val)
      this.root = node
      return this
    }
    else{
      let currentNode = this.root
      let node = new Node(val)
      while (currentNode){
        if (val < currentNode.val){
          if (currentNode.left === null){
            currentNode.left = node
            return this
          }
          else {
            currentNode = currentNode.left
          }
        }
        else {
          if (currentNode.right === null){
            currentNode.right = node
            return this
          }
          else {
            currentNode = currentNode.right
          }
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    const node = new Node(val)
    if (this.root === null){
      this.root = node
      return this
    }
    if (val < current.val) {
      if (current.left === null){
        current.left = node
        return this
      }
      return this.insertRecursively(val, current.left)
    }
    if (val > current.val) {
      if (current.right === null){
        current.right = node
        return this
      }
      return this.findRecursively(val, current.right)
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val, current = this.root) {
    while (true){
      if (current === null) return undefined
      if (current.val === val) return current
      if (val < current.val) {
        current = current.left
      }
      else{
        current = current.right
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (current === null) return undefined
    if (current.val === val) return current
    if (val < current.val) return this.findRecursively(val, current.left)
    else return this.findRecursively(val, current.right)
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    const node = this.root
    let data = []

    function traverse(node){
      data.push(node.val)
      node.left && traverse(node.left)
      node.right && traverse(node.right)
    }

    traverse(node)
    return data
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = []
    let node = this.root

    function traverse(node){
      node.left && traverse(node.left)
      data.push(node.val)
      node.right && traverse(node.right)
    }

    traverse(node)
    return data
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = []
    let node = this.root

    function traverse(node){
      node.left && traverse(node.left)
      node.right && traverse(node.right)
      data.push(node.val)
    }

    traverse(node)
    return data

  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let data = []
    let queue = [this.root]

    while (queue.length){
      const current = queue.shift()
      data.push(current.val)
      if (current.left) queue.push(current.left)
      if (current.right) queue.push(current.right)
    }

    return data
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  // remove(val) {

  // }

  // /** Further Study!
  //  * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  // isBalanced() {

  // }

  // /** Further Study!
  //  * findSecondHighest(): Find the second highest value in the BST, if it exists.
  //  * Otherwise return undefined. */

  // findSecondHighest() {
    
  // }
}

module.exports = BinarySearchTree;
