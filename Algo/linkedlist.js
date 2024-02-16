
class LinkedList {
    constructor() {
        this.headNode = null;
    }

    append(key, value) {
        if (this.headNode == null) {
            this.prepend(key, value)
            return this.headNode;
        }
        let temp = this.headNode
        while (temp.next !== null) {
            temp = temp.next
        }
        temp.next = new Node(key, value);
        return temp;
    }

    prepend(key, value) {
        let temp = this.headNode
        this.headNode = new Node(key, value)

        this.headNode.next = temp
    }

    size() {
        let count = 0;
        let temp = this.headNode;
        while (temp !== null) {
            count++;
            temp = temp.next;
        }
        return count;
    }

    head() {
        return this.headNode;
    }

    tail() {
        let temp = this.headNode;
        while (temp.next !== null) {
            temp = temp.next
        }
        return temp;
    }

    at(index) {
        let count = 0;
        let temp = this.headNode;
        while (temp !== null) {
            if (count == index) break;
            else {
                count++;
                temp = temp.next
            };
        }

        return temp;
    }

    pop() {
        let temp = this.headNode;
        while (temp.next.next !== null) {
            temp = temp.next
        }
        let rem = temp.next;
        temp.next = null;
        return rem;
    }

}

class Node {
    constructor(key = null, value = null, next = null) {
        this.key = key;
        this.value = value;
        // nextNode = null
        this.next = next;
    }
}

export { LinkedList, Node };