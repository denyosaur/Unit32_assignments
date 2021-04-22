const items = require("./fakeDb")

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }

    static findItem(searchFor) {
        let foundItem = items.find(ele => ele.name === searchFor);
        if (!foundItem) {
            throw { 'message': 'Not Found', 'status': 404 }
        }
        return foundItem
    }

    static patchItem(itemName, changeTo) {
        let foundItem = items.find(ele => ele.name === itemName);
        if (!foundItem) {
            throw { 'message': 'Not Found', 'status': 404 };
        }
        foundItem.name = changeTo.name;
        foundItem.price = changeTo.price;
        return foundItem;
    }

    static deleteItem() {
        let foundItem = items.find(ele => ele === itemName);
        let index = items.indexOf(foundItem);
        if (!foundItem) {
            throw { 'message': 'Not Found', 'status': 404 };
        }
        items.splice(index, 1);
        return foundItem;
    }
}

module.exports = Item;