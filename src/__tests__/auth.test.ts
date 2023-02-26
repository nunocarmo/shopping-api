import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import createServer from '../utils/server';
import { Express } from 'express';
import dotenv from 'dotenv';
import { registerBodyType } from '../types/registerBodyType';

const app: Express = createServer();
let mongoDB: MongoMemoryServer;

const registerBodyMissing: registerBodyType = {
    email: 'mock',
    password: '',
    username: 'mock'
};
const registerBodyIncorrect: registerBodyType = {
    password: '111',
    username: 'mock',
    email: 'mock',
};
const registerBody: registerBodyType = {
    email: 'mock',
    password: 'mock',
    username: 'mock'
};

describe('Auth', () => {
    beforeAll(async () => {
        dotenv.config();
        mongoDB = await MongoMemoryServer.create();
        await mongoose.connect(mongoDB.getUri());
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoDB.stop();
        await mongoose.disconnect();
    });
    describe('POST', () => {
        describe('Register', () => {
            describe('register new user with missing fields', () => {
                it('should return a 400', async () => {
                    const { statusCode } = await supertest(app).post('/api/register')
                        .send(registerBodyMissing);
                    expect(statusCode).toEqual(400);
                });
            });
            describe('register new user with all fields', () => {
                it('should return a 201', async () => {
                    const { statusCode } = await supertest(app).post('/api/register')
                        .send(registerBody);
                    expect(statusCode).toEqual(201);
                });
            });
            describe('register new user with all fields that already exists', () => {
                it('should return a 409', async () => {
                    const { statusCode } = await supertest(app).post('/api/register')
                        .send(registerBody);
                    expect(statusCode).toEqual(409);
                });
            });
        });
        describe('Login', () => {
            describe('Trying to log in with incorrect fields', () => {
                it('should return a 401', async () => {
                    const { statusCode } = await supertest(app).post('/api/login')
                        .send(registerBodyIncorrect);
                    expect(statusCode).toEqual(401);
                });
            });
            describe('Trying to log in with missing fields', () => {
                it('should return a 400', async () => {
                    const { statusCode } = await supertest(app).post('/api/login')
                        .send(registerBodyMissing);
                    expect(statusCode).toEqual(400);
                });
            });
            describe('Trying to log in', () => {
                it('should return a 200', async () => {
                    const { statusCode } = await supertest(app).post('/api/login')
                        .send(registerBody);
                    expect(statusCode).toEqual(200);
                });
            });
        });
    });
});