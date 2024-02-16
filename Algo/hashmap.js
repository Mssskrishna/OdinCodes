import { LinkedList, Node } from "./linkedlist.js";

class Hashmap {
    constructor() {
        this.bucketLength = 16;
        this.array = Array.from({ length: this.bucketLength }, () => new LinkedList())
        // this.loadFactor = 0.75
        this.setlength = 0;
    }
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.bucketLength;
        }

        return hashCode;
    }

    set(key, value=null) {
        let index = this.hash(key);
        let existingNode = this.#findNode(key);
        if (existingNode !== null) {
            existingNode.value = value;
        } else {
            this.array[index].append(key, value)

            this.setlength++;
        }
    }
    #findNode(key) {
        let index = this.hash(key)
        // console.log(this.array[index])

        let temp = this.array[index].headNode;
        while (temp != null) {
            if (temp.key === key) return temp;
            else temp = temp.next;
        }
        return null;

    }
    get(key) {
        let node = this.#findNode(key)
        return node ? node.value : "key not found";
    }

    has(key) {
        return this.#findNode(key) !== null
    }

    remove(key) {
        let nodeToremove = this.#findNode(key);
        if (nodeToremove != null) {
            if (nodeToremove.next == null) {
                nodeToremove.next = null;
            } else {
                nodeToremove.next = nodeToremove.next.next;
            }
            return true;
        }
        return false;
    }
    length() {
        return this.setlength;
    }
    clear() {
        this.array.forEach(element => {
            element.headNode = null;
        })
    }
    temparray(mode) {
        let hashkey = []
        this.array.forEach(element => {
            let temp = element.headNode;
            while (temp != null) {
                hashkey.push(mode === "key" ? temp.key : temp.value);
                temp = temp.next;
            }
        })
        return hashkey;
    }
    keys() {
        return this.temparray("key");
    }

    values() {
        return this.temparray("value");
    }
    entries() {
        let hashkey = []
        this.array.forEach(element => {
            let temp = element.headNode;
            while (temp != null) {
                hashkey.push([temp.key, temp.value])
                temp = temp.next;
            }
        })
        return hashkey;
    }
}

const nh = new Hashmap();
nh.set("Carlas", 23);
nh.set("Carlaw", 23);
nh.set("Carlaw", 24);

nh.set("Carlaef", 23);
nh.set("Carlaegf", 23);
nh.set("Carlrgg");

console.log(nh.get("Carlrgg"))
console.log(nh.length())
// console.log(nh.remove("Carlrgg"))
// console.log(nh)
// nh.clear();
console.log(nh.keys())
console.log(nh.values())
console.log(nh.entries())
