import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import Product from '../models/Product';
import { productType } from '../types/productType';
import createServer from '../utils/server';
import { Express } from 'express';
const app: Express = createServer();
let mongoDB: MongoMemoryServer;
const product: productType = {
    title: 'new Title',
    description: 'mock',
    categories: 'mock',
    img: 'mock',
    price: 11,
    amount: 10,
    reviews: [],
};
const productWithMissingFields: productType = {
    title: 'next',
    description: 'mock',
    img: 'mock',
    price: 11,
    amount: 10,
};

const titles = ['test1', 'test2', 'test3', 'test4', 'test5'];

describe('product', () => {
    beforeAll(async () => {
        mongoDB = await MongoMemoryServer.create();
        await mongoose.connect(mongoDB.getUri());
        titles.forEach(async title => {
            const testProduct = await Product.create({ ...product, title });
            await testProduct.save();
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoDB.stop();
        await mongoose.disconnect();
    });
    describe('Post', () => {
        describe('if product does not exist and you try to create one', () => {
            it('should return a 201', async () => {
                const { body, statusCode } = await supertest(app).post('/api/product')
                    .send(product);
                product._id = body._id;
                product.__v = expect.any(Number);
                expect(statusCode).toBe(200);
                expect(body).toEqual(product);
            });
        });
        describe('if you try to create a product', () => {
            describe('and it already exists', () => {
                it('should return a 409', async () => {
                    const { statusCode } = await supertest(app).post('/api/product').send(product);
                    expect(statusCode).toBe(409);
                });
            });
            describe('with missing fields', () => {
                it('should return a 400', async () => {
                    const { statusCode } = await supertest(app).post('/api/product').send(productWithMissingFields);
                    expect(statusCode).toBe(400);
                });
            });
        });
    });
    describe('Get', () => {
        describe('search product page=0 and limit=5 and title=new', () => {
            it('should return a 200 and 1 product', async () => {
                const { body, statusCode } = await supertest(app).get('/api/product/search?page=0&limit=5&title=new');
                expect(statusCode).toBe(200);
                expect(body).toEqual([product]);
                expect(body.length).toEqual(1);
            });
        });
        describe('search product with', () => {
            describe('page=a and limit=5', () => {
                it('should return a 200 and the first page ', async () => {
                    const { body, statusCode } = await supertest(app).get('/api/product/search?page=a&limit=5');
                    expect(statusCode).toBe(200);
                    expect(body.length).toEqual(5);
                });
            });
            describe('page=-1 and limit=5', () => {
                it('should return a 200 and 1 products of the second page', async () => {
                    const { body, statusCode } = await supertest(app).get('/api/product/search?page=a&limit=5');
                    expect(statusCode).toBe(200);
                    expect(body.length).toEqual(5);
                });
            });

            describe('page=0 and limit=a', () => {
                it('should return a 200 and 5 products ', async () => {
                    const { body, statusCode } = await supertest(app).get('/api/product/search?page=a&limit=a');
                    expect(statusCode).toBe(200);
                    expect(body.length).toEqual(5);
                });
            });
            describe('page=0 and limit=-1', () => {
                it('should return a 200 and 1 products ', async () => {
                    const { body, statusCode } = await supertest(app).get('/api/product/search?page=a&limit=-1');
                    expect(statusCode).toBe(200);
                    expect(body.length).toEqual(1);
                });
            });

            describe('with no page or limit', () => {
                it('should return 200 and the default page 0 and limit of 5 products ', async () => {
                    const { body, statusCode } = await supertest(app).get('/api/product/search');
                    expect(statusCode).toBe(200);
                    expect(body.length).toEqual(5);
                });
            });
        });

        describe('all products', () => {
            it('should return a 200 and 6 products', async () => {
                const { body, statusCode } = await supertest(app).get('/api/product');
                expect(statusCode).toBe(200);
                expect(body.length).toEqual(6);
            });
        });

        describe('random products', () => {
            it('should return a 200 and 5 products', async () => {
                const { body, statusCode } = await supertest(app).get('/api/product/random');
                expect(statusCode).toBe(200);
                expect(body.length).toEqual(5);
            });
        });

        describe('if product does not exist', () => {
            it('should return a 404', async () => {
                const productId = '63f6aeb4fbde901f90c92923';
                const { statusCode } = await supertest(app).get(`/api/product/${productId}`);
                expect(statusCode).toBe(404);

            });
        });
        describe('if product exist', () => {
            it('should return a 200', async () => {
                const { body, statusCode } = await supertest(app).get(`/api/product/${product._id}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual(product);
            });
        });
    });
});
