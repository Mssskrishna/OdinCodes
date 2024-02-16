class Node {
    constructor(value = 0, left = null, right = null) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {

    constructor() {
        this.root = null
    }
    balancedBSTtree(array) {
        this.root = this.buildTree(array, 0, array.length - 1)
    }
    buildTree(array, l, r) {
        if (l > r)
            return null;
        const mid = Math.floor((l + r) / 2);
        const newNode = new Node(array[mid]);

        newNode.left = this.buildTree(array, l, mid - 1);
        newNode.right = this.buildTree(array, mid + 1, r);
        return newNode;
    }
    insertinBST(value, node = this.root) {
        if (node == null) {
            return new Node(value)
        }
        if (value < node.value) {
            node.left = this.insertinBST(value, node.left);
        } else {
            node.right = this.insertinBST(value, node.right);
        }
        return node;
    }

    deleteinBST(value, node = this.root) {
        if (value < node.value) {
            node.left = this.deleteinBST(value, node.left);
        } else if (value > node.value) {
            node.right = this.deleteinBST(value, node.right);
        } else {
            if (node.left == null) {
                const temp = node.right;
                return temp;
            } else if (node.right == null) {
                const temp = node.left;
                return temp;
            } else {
                const temp = this.inorderSuc(node.right)
                node.value = temp.value;
                node.right = this.deleteinBST(temp.value, node.right)
            }
        }
        return node;
    }
    inorderSuc(node = this.root) {
        let curr = node;
        while (curr != null && curr.left != null) {
            curr = curr.left;
        }
        return curr;
    }
}

const tree = new Tree()

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const newarray = array.filter((item, index) => array.indexOf(item) === index)
newarray.sort(function (a, b) { return a - b })

tree.balancedBSTtree(newarray)

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

prettyPrint(tree.root)