import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import createServer from '../utils/server';
import { Express } from 'express';
const app: Express = createServer();
let mongoDB: MongoMemoryServer;

describe('User', () => {
    beforeAll(async () => {
        mongoDB = await MongoMemoryServer.create();
        await mongoose.connect(mongoDB.getUri());
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoDB.stop();
        await mongoose.disconnect();
    });

    describe('Get', () => {
        describe('User information without login in or with missing token', () => {
            it('should return a 401', async () => {
                const { statusCode } = await supertest(app).get('/api/user/profile');
                expect(statusCode).toEqual(401);
            });
        });
    });
});


