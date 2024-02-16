class Node {
    constructor(value = 0) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array, 0, array.length - 1);
    }
    buildTree(array, low, high) {
        if (low > high) return null;
        const mid = Math.floor((low + high) / 2);
        const newNode = new Node(array[mid]);

        newNode.left = this.buildTree(array, low, mid - 1);
        newNode.right = this.buildTree(array, mid + 1, high);
        return newNode;
    }
    insert(value, node = this.root) {
        if (node == null) {
            return new Node(value)
        }
        if (value < node.value) {
            node.left = this.insert(value, node.left)
        } else {
            node.right = this.insert(value, node.right)
        }
        return node;
    }

    delete(value, node = this.root) {
        if (value < node.value) {
            node.left = this.delete(value, node.left)
        } else if (value > node.value) {
            node.right = this.delete(value, node.right)
        } else {
            if (node.left == null) {
                const temp = node.right;
                return temp;
            } else if (node.right == null) {
                const temp = node.left;
                return temp;
            } else {
                const temp = this.inOrdersuc(node.right)
                node.value = temp.value;
                node.right = this.delete(temp.value, node.right)
            }
        }

        return node;
    }
    inOrdersuc(node = this.root) {
        let curr = node;
        while (curr != null && curr.left != null) {
            curr = curr.left
        }
        return curr;
    }
    find(value, node = this.root) {
        if (node == null) {
            return false;
        }
        if (value < node.value) {
            return this.find(value, node.left)
        } else if (value > node.value) {
            return this.find(value, node.right)
        } else {
            return true;
        }
    }
    levelorder(node = this.root, callback) {
        let queue = [node];
        let result = [];
        while (queue.length > 0) {
            const current = queue.shift();
            if (callback)
                callback(current)
            else
                result.push(current.value)

            if (current.left)
                queue.push(current.left)
            if (current.right)
                queue.push(current.right)
        }
        return result
    }
    preorder(node = this.root, callback) {
        let result = [];
        result = this.preorderLevel(result, node, callback);
        if (!callback) return result;
    }
    inorder(node = this.root, callback) {
        let result = [];
        result = this.inorderLevel(result, node, callback);
        if (!callback) return result;
    }
    postorder(node = this.root, callback) {
        let result = [];
        result = this.postorderLevel(result, node, callback);
        if (!callback) return result;
    }
    preorderLevel(result, node = this.root, callback) {
        if (node == null) {
            return;
        }
        if (callback) {
            callback(node)
        }
        else {
            result.push(node.value)
        }

        this.preorderLevel(result, node.left, callback)
        this.preorderLevel(result, node.right, callback)
        return result;
    }
    inorderLevel(result, node = this.root, callback) {
        if (node == null) {
            return;
        }

        this.inorderLevel(result, node.left, callback);

        if (callback) {
            callback(node)
        }
        else {
            result.push(node.value)
        }

        this.inorderLevel(result, node.right, callback)

        return result;
    }
    postorderLevel(result, node = this.root, callback) {
        if (node == null) {
            return;
        }

        this.postorderLevel(result, node.left, callback);

        this.postorderLevel(result, node.right, callback)
        if (callback) {
            callback(node)
        }
        else {
            result.push(node.value)
        }

        return result;
    }


    height(node = this.root) {
        if (node == null)
            return 0;
        return Math.max(this.height(node.right), this.height(node.left)) + 1;
    }


    depth(value, dist, node = this.root) {
        if (node == null) {
            return -1;
        }
        if (node.value == value) {
            return dist;
        } else if (node.value > value) {
            return this.depth(value, dist + 1, node.left);
        } else {
            return this.depth(value, dist + 1, node.right);
        }
    }

    isBalanced(node = this.root) {
        if (node == null)
            return true;
        if (Math.abs((this.height(node.left)) - (this.height(node.right))) == 0 || Math.abs((this.height(node.left)) - (this.height(node.right))) == 1) {
            this.isBalanced(node.left)
            this.isBalanced(node.right)
            return true;
        }
        return false;
    }

    reBalance(node = this.root) {
        const nodes = []
        this.inorder(node, (node) => nodes.push(node.value))
        this.root = null;
        this.buildBST(nodes)
    }
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

const getRandomNumbers = (count) => {
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * 100))
    }
    return Array.from(numbers);
}

const numbers = getRandomNumbers(12)
numbers.sort(function (a, b) { return a - b });


const bst = new Tree(numbers)
// bst.buildBST(numbers)
prettyPrint(bst.root)