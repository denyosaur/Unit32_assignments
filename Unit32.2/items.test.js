process.env.NODE_ENV = 'test'

const request = require('supertest');
const app = require('./app');
let items = require('.fakeDb');
const { test } = require('picomatch');
let item = { 'name': "testfood", 'price': 123 };

beforeEach(async () => {
    items.push(item)
})
afterEach(async () => {
    items = []
})
describe('GET /items', async () => {
    test('get items in DB', async () => {
        const res = await request(app).get('/items');
        const { items } = res.body;
        expect(res.statusCode).toBe(200);
    })
})

describe('GET /items/:name', async () => {
    test('get specific item from DB by name', async () => {
        const res = await request(app).get('/items/testfood');
        const { items } = res.body;
        expect(res.statusCode).toBe(200);
        expect(items.name).toBe('testfood');
    })

    test('404 on getting nonexistant item', async () => {
        const res = await request(app).get('/items/fakefood');
        expect(res.statusCode).toBe(404);
    })
})

describe('POST /items', async () => {
    test('POST specific item', async () => {
        const res = await request(app)
            .post('/items')
            .send({
                'name': 'newitem',
                'price': 321
            })
        expect(res.statusCode).toBe(200);
        expect(res.body.item.name).toEqual('newitem')
        expect(res.body.item.price).toEqual(321)
    })
})

describe('PATCH /items', async () => {
    test('PATCH specific item', async () => {
        const res = await request(app).patch('/items/testfood').send({ 'name': 'testdessert' })
        expect(res.statusCode).toBe(200);
        expect(res.body.item.name).toEqual('testdessert')
        expect(res.body.item.price).toEqual(123)
    })
    test('404 on getting nonexistant item', async () => {
        const res = await request(app).get('/items/fakefood');
        expect(res.statusCode).toBe(404);
    })
})

describe('DELETE /items', async () => {
    const res = await request(app).delete('/items/testfood')
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ 'Deleted Item': { 'name': "testfood", 'price': 123 } })
    test('404 on getting nonexistant item', async () => {
        const res = await request(app).get('/items/fakefood');
        expect(res.statusCode).toBe(404);
    })
})