import express from 'express'
import {getQuery, postQuery, putQuery, deleteQuery} from '../controllers/filmController'

const router = express.Router();

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

