import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import createServer from '../utils/server';
import { Express } from 'express';
import dotenv from 'dotenv';
import { registerBodyType } from '../types/registerBodyType';
import Product from '../models/Product';
import { productType } from '../types/productType';
import User from '../models/User';
import { loginType } from '../types/loginType';
import signJwt from '../utils/signJwt';

const app: Express = createServer();
let mongoDB: MongoMemoryServer;

const product: productType = {
    title: 'new Title',
    description: 'mock',
    categories: 'mock',
    img: 'mock',
    price: 11,
    amount: 10,
};
const registerBody: registerBodyType = {
    email: 'mock',
    password: 'mock',
    username: 'mock'
};

const logUserMock: loginType = {
    email: 'mock',
    password: '',
    username: 'mock'
};
type productArray = {
    productId?: mongoose.Types.ObjectId | string,
    quantity: number
}

type orderType = {
    products: productArray[]
    amount: number,
    address: {
        line: string
    }
}

const order: orderType = {
    products: [
        {
            productId: '',
            quantity: 1
        }
    ],
    amount: 20,
    address: {
        line: 'hello'
    }
};

const userOrders = [
    {
        __v: 0,
        _id: expect.any(String),
        address: {
            'line': 'hello'
        },
        amount: 20,
        products: [
            {
                _id: expect.any(String),
                productId: {
                    __v: 0,
                    _id: expect.any(String),
                    amount: 10,
                    categories: 'mock',
                    description: 'mock',
                    img: 'mock',
                    price: 11,
                    rating: 0,
                    title: 'new Title',
                },
                quantity: 1
            }
        ],
        status: 'pending',
        userId: expect.any(String)
    }
];
describe('Cart', () => {
    beforeAll(async () => {
        dotenv.config();
        mongoDB = await MongoMemoryServer.create();
        await mongoose.connect(mongoDB.getUri());
        const newProduct = new Product(product);
        const savedProduct = await newProduct.save();
        product._id = savedProduct._id;
        const newUser = new User(registerBody);
        const savedUser = await newUser.save();
        logUserMock._id = savedUser._id;
        order.products[0].productId = savedProduct._id;
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoDB.stop();
        await mongoose.disconnect();
    });
    describe('POST', () => {
        describe('Create an order', () => {
            describe('while not loged in', () => {
                it('should return a 403', async () => {
                    const { statusCode } = await supertest(app).post('/api/cart');
                    expect(statusCode).toEqual(403);
                });
            });
            describe('while logged in', () => {
                it('should return a 201', async () => {
                    const jwt = signJwt(logUserMock);
                    const { statusCode } = await supertest(app).post('/api/order')
                        .set('Authorization', `Bearer ${jwt}`)
                        .send(order);
                    expect(statusCode).toEqual(201);
                });
            });
        });
    });
    describe('Get', () => {
        describe('Users Orders', () => {
            describe('while not loged in', () => {
                it('should return a 403', async () => {
                    const { statusCode } = await supertest(app).get('/api/order');
                    expect(statusCode).toEqual(403);
                });
            });
            describe('while logged in', () => {
                it('should return a 200 and all user orders', async () => {
                    const jwt = signJwt(logUserMock);
                    const { body, statusCode } = await supertest(app).get('/api/order')
                        .set('Authorization', `Bearer ${jwt}`);
                    console.log(body);
                    expect(body).toEqual(userOrders);
                    expect(statusCode).toEqual(200);
                });
            });
        });
    });
});


