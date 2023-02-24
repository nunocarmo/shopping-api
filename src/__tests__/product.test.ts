import { assert } from "console";
import e from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import supertest from "supertest";
import { productType } from "../types/productType";
import createServer from "../utils/server";
const app = createServer();
const product = {
    title: "new Title",
    description: "mock",
    categories: "mock",
    img: "mock",
    price: 11,
    amount: 10,
} as productType;
const productWithMissingFields = {
    title: "next",
    description: "mock",
    img: "mock",
    price: 11,
    amount: 10,
} as productType;
describe('product', () => {
    beforeAll(async () => {
        const mongoDB = await MongoMemoryServer.create();
        await mongoose.connect(mongoDB.getUri());
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    })
    describe('Post', () => {
        describe('if product does not exist and you try to create one', () => {
            it("should return a 200", async () => {
                const { body, statusCode } = await supertest(app).post(`/api/product`)
                    .send(product)
                product._id = body._id
                product.__v = expect.any(Number);
                product.rating = 0;
                expect(statusCode).toBe(200);
                expect(body).toEqual(product);
            });
        });
        describe('if you try to create a product', () => {
            describe('and it already exists', () => {
                it("should return a 409", async () => {
                    const { statusCode } = await supertest(app).post(`/api/product`).send(product)
                    expect(statusCode).toBe(409);
                });
            });
            describe('with missing fields', () => {
                it("should return a 400", async () => {
                    const { statusCode } = await supertest(app).post(`/api/product`).send(productWithMissingFields)
                    expect(statusCode).toBe(400);
                });
            });
        });
    });
    describe('Get', () => {
        describe('if product does not exist', () => {
            it("should return a 404", async () => {
                const productId = "63f6aeb4fbde901f90c92923";
                const { statusCode } = await supertest(app).get(`/api/product/${productId}`)
                expect(statusCode).toBe(404);
            });
        });
        describe('if product exist', () => {
            it("should return a 200", async () => {
                const { body, statusCode } = await supertest(app).get(`/api/product/${product._id}`)
                expect(statusCode).toBe(200);
                expect(body).toEqual(product);
            });
        });
    });
});


