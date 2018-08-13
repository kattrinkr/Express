import express from 'express'
import {getFilmCategories, createFilmCategory, editFilmCategory, removeFilmCategory} from '../controllers/filmCategoriesController'
import {filmCategoriesValidator} from '../servises/filmCategoriesValidator'

const router = express.Router();

router.get('/', getFilmCategories);
router.post('/', filmCategoriesValidator, createFilmCategory);
router.put('(/:id)?', filmCategoriesValidator, editFilmCategory);
router.delete('/:id', removeFilmCategory);

export {router}

