import express from 'express';
import { getCategories, createCategory,deleteCategory } from '../controllers/CategoryController.js';

const categeoryRouter = express.Router();
categeoryRouter.get("/:name", getCategories);
categeoryRouter.post('/', createCategory);
categeoryRouter.delete("/:name", deleteCategory);

export default categeoryRouter; 