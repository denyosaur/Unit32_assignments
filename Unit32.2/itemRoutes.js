const Item = require('./item');
const express = require('express');
const items = require("./fakeDb")
const app = express();

const router = new express.Router();

router.get('', (req, res, next) => {
    try {
        return res.send(items)
    }
    catch (e) {
        return next(e)
    }

})

router.post('', (req, res, next) => {
    try {
        let name = req.body.name
        let price = req.body.price
        let newItem = new Item(name, price)
        return res.json({ 'new item': newItem })
    }
    catch (e) {
        return next(e)
    }

})

router.get('/:name', (req, res, next) => {
    try {
        let searched = req.params.name
        let foundItem = Item.findItem(searched)
        return res.json({ item: foundItem })
    }
    catch (e) {
        return next(e)
    }
})

router.patch('/:name', (req, res, next) => {
    try {
        let name = req.params.name;
        let updatedInfo = req.body;
        let updatedItem = Item.patchItem(name, updatedInfo);
        return res.json({ 'added': updatedItem });
    }
    catch (e) {
        return next(e)
    }
})

router.delete('/:name', (req, res) => {
    try {
        let name = req.params.name;
        let deletedItem = Item.deleteItem(name)
        return res.json({ 'Deleted Item': deletedItem })
    }
    catch (e) {
        return next(e)
    }
})

module.exports = router;