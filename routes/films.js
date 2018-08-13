import express from 'express'
import {getFilms, createFilm, editFilm, removeFilm} from '../controllers/filmController'
import {router as categoriesRouter} from './filmCategories'

const router = express.Router();
router.use('/categories', categoriesRouter);

router.get('/', getFilms);
router.post('/', createFilm);
router.put('/:id', editFilm);
router.delete('/:id', removeFilm);

export {router}
