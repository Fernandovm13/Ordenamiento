export class LinkedListNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

export class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        if (!this.head) {
            this.head = new LinkedListNode(value);
            return;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = new LinkedListNode(value);
    }

    toArray() {
        const arr = [];
        let current = this.head;
        while (current) {
            arr.push(current.value);
            current = current.next;
        }
        return arr;
    }

    static fromJSON(jsonData) {
        const list = new LinkedList();
        jsonData.forEach(item => list.append(item));
        return list;
    }
}
