const express = require('express');
const request = require('supertest');
const { createNewCategory } = require('../controllers/category.controller');
const { createNewCategoryService } = require('../services/category.service');

jest.mock('../services/category.service', () => ({
    createNewCategoryService: jest.fn(),
}));

const app = express();
app.use(express.json());

app.post('/categories', createNewCategory);

describe('Create new category: POST /categories', () => {
    it('should respond with a 201 status code and return the new category data', async () => {
        const newCategory = { name: 'Test Category' };
        const mockResponse = { id: 1, name: 'Test Category' };

        createNewCategoryService.mockResolvedValue(mockResponse);

        const res = await request(app)
            .post('/categories')
            .send(newCategory);

        expect(res.status).toBe(201);
        expect(res.body).toEqual({ id: 1, name: 'Test Category' });
    });

    it('should respond with a 400 status code when category name is missing', async () => {
        const testCase = [
            {},
            { description: 'Test category description' }
        ];

        testCase.forEach(async (element) => {
            const res = await request(app).post('/categories').send(element);
            expect(res.status).toBe(400);
        });
    });

    it('should respond with a 400 status code when category name already exists', async () => {
        const newCategory = { name: 'Test Category' };
    
        jest.mock('../services/category.service');
        createNewCategoryService.mockRejectedValue({
            statusCode: 400,
            message: 'This category name already taken',
        });
    
        const res = await request(app).post('/categories').send(newCategory);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({});
    });
});
