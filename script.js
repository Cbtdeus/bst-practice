import { mergeSort } from "./mergesort.js";
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  buildTree(arr, start, end) {
    if (start > end) return null;

    // Find the middle element
    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    let root = new Node(arr[mid]);

    // Create left subtree
    root.left = this.buildTree(arr, start, mid - 1);

    // Create right subtree
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(value, currentNode = this.root) {
    if (currentNode === null) {
      return new Node(value);
    }
    if (currentNode.value === value) {
      return currentNode;
      /* duplicate prevention */
    }

    if (value > currentNode.value) {
      currentNode.right = this.insert(value, currentNode.right);
    }

    if (value < currentNode.value) {
      currentNode.left = this.insert(value, currentNode.left);
    }

    return currentNode;
  }
  deleteNode(value, currentNode = this.root) {
    if (currentNode === null) {
      return currentNode;
    }

    if (currentNode.value > value) {
      currentNode.left = this.deleteNode(value, currentNode.left);
    } else if (currentNode.value < value) {
      currentNode.right = this.deleteNode(value, currentNode.right);
    } else {
      if (currentNode.left === null) {
        return currentNode.right;
      }
      if (currentNode.right === null) {
        return currentNode.left;
      }
      let succ = getSuccessor(currentNode);
      currentNode.value = succ.value;
      currentNode.right = this.deleteNode(succ.value, currentNode.right);
    }
    return currentNode;
  }

  find(value) {
    let curr = this.root;
    while (curr != null) {
      if (curr.value === value) {
        return curr;
      }
      if (curr.value > value) {
        curr = curr.left;
        continue;
      }
      if (curr.value < value) {
        curr = curr.right;
      }
    }
  }

  levelOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("No callback specified");
    }
    if (root === null) {
      return;
    }
    let queue = [];
    queue.push(root);
    while (queue.length > 0) {
      callback(queue[0].value);
      if (queue[0].left != null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right != null) {
        queue.push(queue[0].right);
      }
      queue.shift();
    }
  }

  inOrder(callback, root = this.root) {
    if (root === null) {
      return;
    }
    this.inOrder(callback, root.left);
    callback(root);
    this.inOrder(callback, root.right);
  }

  preOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("No callback provided");
    }
    if (root === null) {
      return;
    }
    callback(root);
    this.preOrder(callback, root.left);
    this.preOrder(callback, root.right);
  }

  postOrder(callback, root = this.root) {
    if (!callback) {
      throw new Error("No callback provided");
    }
    if (root === null) {
      return;
    }
    this.postOrder(callback, root.left);
    this.postOrder(callback, root.right);
    callback(root);
  }

  height(node = this.root) {
    if (node === null) {
      return -1;
    }
    let lDepth = this.height(node.left);
    let rDepth = this.height(node.right);

    return Math.max(lDepth, rDepth) + 1;
  }

  findDepth(value, root = this.root) {
    // Base case
    if (root == null) return -1;

    // Initialize distance as -1
    let dist = -1;

    // Check if x is current node=
    if (
      root.value == value ||
      // Otherwise, check if x is
      // present in the left subtree
      (dist = this.findDepth(value, root.left)) >= 0 ||
      // Otherwise, check if x is
      // present in the right subtree
      (dist = this.findDepth(value, root.right)) >= 0
    )
      // Return depth of the node
      return dist + 1;

    return dist;
  }
  isBalanced(root = this.root) {
    if (Math.abs(this.height(root.left) - this.height(root.right)) > 2) {
      return false;
    }
    return true;
  }

  rebalance() {
    toRebalance = [];
    bst.inOrder(pushToArray);
    this.root = this.buildTree(toRebalance, 0, toRebalance.length - 1);
  }
}

let toRebalance = [];
function pushToArray(item) {
  toRebalance.push(item.value);
}

const rebalanced = [];
function sortArray(array) {
  let unique = [...new Set(array)];
  return mergeSort(unique);
}

function getSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let needSorting = [5, 6, 12, 24, 86, 35, 83, 56, 10, 36, 75];

let bst = new Tree(sortArray(needSorting));

console.log(bst.isBalanced());

prettyPrint(bst.root);

bst.insert(500);

bst.insert(555);

bst.insert(535);

bst.insert(455);

bst.insert(355);

bst.insert(755);

console.log(bst.isBalanced());

bst.rebalance();

prettyPrint(bst.root);
console.log(bst.isBalanced());
