const express = require('express');
const ExpressError = require('./expressError');
const app = express();

const Maths = require('./functions')
const maths = new Maths()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/mean', (req, res) => {
    let numbers = req.query.nums.split(',');
    if (!numbers) {
        throw new ExpressError('Enter valid Numbers!', 400)
    }
    if (!maths.validateInt(numbers)) {
        throw new ExpressError('Enter in only Numbers!', 400)
    }
    let respNum = {
        'operation': 'mean',
        'value': maths.mean(numbers)
    }
    return res.status(200).json(respNum);
})

app.get('/median', (req, res) => {
    let numbers = req.query.nums.split(',');
    if (!numbers) {
        throw (new ExpressError('Enter valid Numbers!', 400))
    }
    if (!maths.validateInt(numbers)) {
        throw (new ExpressError('Enter in only Numbers!', 400))
    }
    let respNum = {
        'operation': 'median',
        'value': maths.median(numbers)
    }
    return res.status(200).json(respNum);
})

app.get('/mode', (req, res) => {
    let numbers = req.query.nums.split(',');
    if (!numbers) {
        throw (new ExpressError('Enter valid Numbers!', 400))
    }
    if (!maths.validateInt(numbers)) {
        throw (new ExpressError('Enter in only Numbers!', 400))
    }
    let respNum = {
        'operation': 'mode',
        'value': maths.mode(numbers)
    }
    return res.status(200).json(respNum);
})

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
    return next(err);
});

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let msg = err.message;
    return res.status(status).json({
        error: { msg, status }
    })
})


app.listen(3000, () => {
    console.log('App on port 3000')
});