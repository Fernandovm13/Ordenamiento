export class ArrayModel {
    constructor(data) {
        this.data = data;
    }

    getArray() {
        return this.data;
    }

    static fromJSON(jsonData) {
        return new ArrayModel(jsonData);
    }
}
