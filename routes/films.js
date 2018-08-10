import express from 'express'
import {getQuery, postQuery, putQuery, deleteQuery} from '../controllers/filmController'
import {router as categoriesRouter} from './filmCategories'

const router = express.Router();
router.use('/categories', categoriesRouter);

router.route('(/:id)?')
    .get(function(req, res) {
        getQuery(req, res)
    })
    .post(function(req, res) {
        postQuery(req, res)
    })
    .put(function(req, res) {
        putQuery(req, res)
    })
    .delete(function(req, res) {
        deleteQuery(req, res)
    });

export {router}

