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

const app: Express = createServer();
let mongoDB: MongoMemoryServer;

const logUserMock: loginType = {
    email: 'mock',
    password: '',
    username: 'mock'
};


describe('User', () => {
    beforeAll(async () => {
        dotenv.config();
        logUserMock.password = CryptoJS.AES.encrypt('mock', process.env.ENCRYPT_KEY as string);
        mongoDB = await MongoMemoryServer.create();
        await mongoose.connect(mongoDB.getUri());
        const user = new User(logUserMock);
        const savedUser = await user.save();
        logUserMock._id = savedUser._id;
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await mongoDB.stop();
        await mongoose.disconnect();
    });

    describe('Get', () => {
        describe('User information without login in or with missing token', () => {
            it('should return a 403', async () => {
                const { statusCode } = await supertest(app).get('/api/user/profile');
                expect(statusCode).toEqual(403);
            });
        });
        describe('User information while logged in', () => {
            it('should return a 200 and the user body', async () => {
                const jwt = signJwt(logUserMock);
                const { body, statusCode } = await supertest(app).get('/api/user/profile')
                    .set('Authorization', `Bearer ${jwt}`);
                const expectedBody = {
                    _id: expect.any(String),
                    username: 'mock',
                    email: 'mock',
                    __v: 0
                };
                expect(expectedBody).toEqual(body);
                expect(statusCode).toEqual(200);
            });
        });
    });
    describe('PATCH', () => {
        describe('update user while not logged in', () => {
            it('should return a 403', async () => {
                const { statusCode } = await supertest(app).patch('/api/user/update');
                expect(statusCode).toEqual(403);
            });
        });

        describe('update user while logged in', () => {
            it('should return a 200 and the updated body', async () => {
                const jwt = signJwt(logUserMock);
                const { body, statusCode } = await supertest(app).patch('/api/user/update')
                    .set('Authorization', `Bearer ${jwt}`)
                    .send({ email: 'mock2' });
                const expectedBody = {
                    _id: expect.any(String),
                    username: 'mock',
                    email: 'mock2',
                    __v: 0
                };
                expect(expectedBody).toEqual(body);
                expect(statusCode).toEqual(200);
            });
        });
    });
    describe('DELETE', () => {
        describe('delete user while not logged in', () => {
            it('should return a 403', async () => {
                const { statusCode } = await supertest(app).delete('/api/user/delete');
                expect(statusCode).toEqual(403);
            });
        });

        describe('delete user while logged in', () => {
            it('should return a 200', async () => {
                const jwt = signJwt(logUserMock);
                const { statusCode } = await supertest(app).delete('/api/user/delete')
                    .set('Authorization', `Bearer ${jwt}`);
                expect(statusCode).toEqual(200);
            });
        });
    });
});


