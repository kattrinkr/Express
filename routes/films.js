import express from 'express'
import {getFilms, createFilm, editFilm, removeFilm} from '../controllers/filmController'
import {router as categoriesRouter} from './filmCategories'
import {filmsValidator} from '../servises/filmsValidator'

const router = express.Router();
router.use('/categories', categoriesRouter);

router.get('/', getFilms);
router.post('/', filmsValidator, createFilm);
router.put('(/:id)?', filmsValidator, editFilm);
router.delete('/:id', removeFilm);

export {router}
