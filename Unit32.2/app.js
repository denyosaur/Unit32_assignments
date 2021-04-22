const express = require('express');
const ExpressError = require('./expressError')
const itemRoutes = require('./itemRoutes')
const app = express();

const items = require('./fakeDb')

app.use(express.json());
app.use('/items', itemRoutes);

app.use(function (req, res, next) {
    return new ExpressError("Not qwert", 404);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        'error': err.message,
    });
});

app.listen(3000, () => {
    console.log('app in port 3000')
})