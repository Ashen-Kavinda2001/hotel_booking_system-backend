import express from 'express';
import { getCategories, createCategory } from '../controllers/CategoryController.js';

const categeoryRouter = express.Router();
categeoryRouter.get('/', getCategories);
categeoryRouter.post('/', createCategory);

export default categeoryRouter; 