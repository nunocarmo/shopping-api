import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import createServer from '../utils/server';
import { Express } from 'express';
import { loginType } from '../types/loginType';
import signJwt from '../utils/signJwt';
import User from '../models/User';
import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
import Product from '../models/Product';
import { productType } from '../types/productType';
import addReviewBody from '../types/addReviewBody';

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
const logUserMock: loginType = {
    email: 'mock',
    password: '',
    username: 'mock'
};

const reviewBody: addReviewBody = {
    product: '',
    comment: 'good',
    rating: '5'
};

const updateReviewBody: addReviewBody = {
    product: '',
    comment: 'not good',
    rating: '1'
};

describe('Review', () => {
    beforeAll(async () => {
        dotenv.config();
        logUserMock.password = CryptoJS.AES.encrypt('mock', process.env.ENCRYPT_KEY as string);
        mongoDB = await MongoMemoryServer.create();
        await mongoose.connect(mongoDB.getUri());
        const user = new User(logUserMock);
        const savedUser = await user.save();
        const testProduct = new Product({ product });
        const savedProduct = await testProduct.save();
        reviewBody.product = savedProduct._id;
        updateReviewBody.product = savedProduct._id;
        logUserMock._id = savedUser._id;
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoDB.stop();
        await mongoose.disconnect();
    });

    describe('Post', () => {
        describe('if you try creating a review', () => {
            describe('and user is not logged in', () => {
                it('should return a 403', async () => {
                    const { statusCode } = await supertest(app).post('/api/review')
                        .send(reviewBody);
                    expect(statusCode).toBe(403);
                });
            });
            describe('and user is logged in', () => {
                it('should return a 201', async () => {
                    const jwt = signJwt(logUserMock);
                    const { statusCode } = await supertest(app).post('/api/review')
                        .set('Authorization', `Bearer ${jwt}`)
                        .send(reviewBody);
                    expect(statusCode).toBe(201);
                });
            });
        });
    });
    describe('Get', () => {
        describe('Getting user review of the product', () => {
            describe('and user is not logged in', () => {
                it('should return a 403', async () => {
                    const { statusCode } = await supertest(app).get('/api/review')
                        .send(reviewBody);
                    expect(statusCode).toBe(403);
                });
            });
            describe('and user is logged in', () => {
                it('should return a 201', async () => {
                    const jwt = signJwt(logUserMock);
                    const { statusCode } = await supertest(app).get('/api/review')
                        .set('Authorization', `Bearer ${jwt}`)
                        .send(reviewBody);
                    expect(statusCode).toBe(200);
                });
            });
        });
    });
    describe('Patch', () => {
        describe('Updating user Review', () => {
            describe('and user is not logged in', () => {
                it('should return a 403', async () => {
                    const { statusCode } = await supertest(app).patch('/api/review')
                        .send(updateReviewBody);
                    expect(statusCode).toBe(403);
                });
            });
            describe('and user is logged in', () => {
                it('should return a 201', async () => {
                    const jwt = signJwt(logUserMock);
                    const { statusCode } = await supertest(app).patch('/api/review')
                        .set('Authorization', `Bearer ${jwt}`)
                        .send(updateReviewBody);
                    expect(statusCode).toBe(200);
                });
            });
        });
    });
    describe('Delete', () => {
        describe('Deleting user Review', () => {
            describe('and user is not logged in', () => {
                it('should return a 403', async () => {
                    const { statusCode } = await supertest(app).delete('/api/review')
                        .send(reviewBody);
                    expect(statusCode).toBe(403);
                });
            });
            describe('and user is logged in', () => {
                it('should return a 200', async () => {
                    const jwt = signJwt(logUserMock);
                    const { statusCode } = await supertest(app).delete('/api/review')
                        .set('Authorization', `Bearer ${jwt}`)
                        .send(reviewBody);
                    expect(statusCode).toBe(200);
                });
            });
        });
    });
});