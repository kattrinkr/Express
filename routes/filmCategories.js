import express from 'express'
import {getFilmCategories, createFilmCategory, editFilmCategory, removeFilmCategory} from '../controllers/filmCategoriesController'

const router = express.Router();

router.get('/', getFilmCategories);
router.post('/', createFilmCategory);
router.put('/:id', editFilmCategory);
router.delete('/:id', removeFilmCategory);

export {router}

