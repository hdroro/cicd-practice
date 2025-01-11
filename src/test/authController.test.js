const request = require('supertest');
const express = require('express');
const passport = require('passport');
const { googleLogin, googleCallback } = require('../controllers/auth.controller');

// Mock passport
jest.mock('passport', () => ({
    authenticate: jest.fn(),
}));

describe('Google Auth API', () => {
    let app;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        app.get('/auth/google', googleLogin);
        app.get(
            '/auth/google/callback',
            (req, res, next) => passport.authenticate('google', { failureRedirect: '/login' })(req, res, next),
            googleCallback
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should redirect user to Google login page', async () => {
        passport.authenticate.mockImplementation(() => (req, res) => {
            res.redirect('https://accounts.google.com/o/oauth2/v2/auth');
        });

        const res = await request(app).get('/auth/google');

        expect(res.status).toBe(302);
        expect(res.header.location).toBe('https://accounts.google.com/o/oauth2/v2/auth');
        expect(passport.authenticate).toHaveBeenCalledWith('google', { scope: ['profile', 'email'] });
    });

    it('should return 200 on successful callback with user data', async () => {
        passport.authenticate.mockImplementation((strategy, options) => (req, res, next) => {
            req.user = { id: 1, email: 'hongdiem0607@gmail.com' };
            next();
        });

        const res = await request(app).get('/auth/google/callback');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: 'Login successful',
            user: { id: 1, email: 'hongdiem060703@gmail.com' },
        });
    });

    it('should return 401 if authentication fails', async () => {
        passport.authenticate.mockImplementation(() => (req, res) => {
            req.user = null;
            res.status(401).json({ message: 'Authentication failed' });
        });

        const res = await request(app).get('/auth/google/callback');

        expect(res.status).toBe(401);
        expect(res.body).toEqual({
            message: 'Authentication failed',
        });
    });
});
