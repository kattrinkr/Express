import express from 'express'
import {ERRORS} from '../constants/filmCategories'

const filmCategoriesValidator = express();

filmCategoriesValidator.use('(/:id)?', function (req, res, next) {
    res.locals.errors = {};
    if ((req.method === 'POST' && !req.body.id) || (req.method === 'PUT' && !req.params.id)) {
        res.locals.errors.id = ERRORS.id.there
    }
    next();
}, function (req, res, next) {
    if (!req.body.title) {
        res.locals.errors.title = ERRORS.title.there
    } else if (req.body.title.length < 3) {
        res.locals.errors.title = ERRORS.title.minLength
    }
    next();
}, function (req, res, next) {
    if (!req.body.description) {
        res.locals.errors.description = ERRORS.description.there
    } else if (req.body.description.length < 3) {
        res.locals.errors.description = ERRORS.description.minLength
    } else if (req.body.description.length > 500) {
        res.locals.errors.description = ERRORS.description.maxLength
    }
    next();
}, function (req, res, next) {
    if (!req.body.films) {
        res.locals.errors.films = ERRORS.films.there
    } else if (!(req.body.films instanceof Array)) {
        res.locals.errors.films = ERRORS.films.isArray
    }
    next();
}, function (req, res, next) {
    if (Object.keys(res.locals.errors).length !== 0) {
        res.status(422).send(res.locals.errors)
    }
    next(); 
});

export {filmCategoriesValidator}