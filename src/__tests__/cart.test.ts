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

const fullUserCart = {
    __v: 0,
    _id: expect.any(String),
    products: [
        {
            _id: expect.any(String),
            productId: expect.any(String),
            quantity: 2
        }
    ],
    userId: expect.any(String)
};

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
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoDB.stop();
        await mongoose.disconnect();
    });
    describe('POST', () => {
        describe('Create Cart for user', () => {
            describe('while not loged in', () => {
                it('should return a 403', async () => {
                    const { statusCode } = await supertest(app).post('/api/cart');
                    expect(statusCode).toEqual(403);
                });
            });
            describe('while logged in', () => {
                it('should return a 200 and the user body', async () => {
                    const jwt = signJwt(logUserMock);
                    const { statusCode } = await supertest(app).post('/api/cart')
                        .set('Authorization', `Bearer ${jwt}`);
                    expect(statusCode).toEqual(201);
                });
            });
            describe('while a cart already exists for the user', () => {
                it('should return a 409 and the user body', async () => {
                    const jwt = signJwt(logUserMock);
                    const { statusCode } = await supertest(app).post('/api/cart')
                        .set('Authorization', `Bearer ${jwt}`);
                    expect(statusCode).toEqual(409);
                });
            });
        });
    });
    describe('Patch', () => {
        describe('Add product to cart', () => {
            describe('while not loged in', () => {
                it('should return a 403', async () => {
                    const { statusCode } = await supertest(app).patch('/api/cart')
                        .send(product);
                    expect(statusCode).toEqual(403);
                });
            });
            describe('while logged in', () => {
                it('should return a 200 and the user products in the cart', async () => {
                    const jwt = signJwt(logUserMock);
                    const { body, statusCode } = await supertest(app).patch('/api/cart')
                        .set('Authorization', `Bearer ${jwt}`)
                        .send({
                            products: [{
                                productId: product._id,
                                quantity: 2,
                            }]
                        });
                    expect(body.products).toEqual([{ _id: expect.any(String), productId: expect.any(String), quantity: 2 }]);
                    expect(statusCode).toEqual(200);
                });
            });
        });
    });
    describe('Get', () => {
        describe('User Cart', () => {
            describe('while not loged in', () => {
                it('should return a 403', async () => {
                    const { statusCode } = await supertest(app).patch('/api/cart')
                        .send(product);
                    expect(statusCode).toEqual(403);
                });
            });
            describe('while logged in', () => {
                it('should return a 200 and the user full cart', async () => {
                    const jwt = signJwt(logUserMock);
                    const { body, statusCode } = await supertest(app).patch('/api/cart')
                        .set('Authorization', `Bearer ${jwt}`);
                    expect(body).toEqual(fullUserCart);
                    expect(statusCode).toEqual(200);
                });
            });
        });
    });
});

