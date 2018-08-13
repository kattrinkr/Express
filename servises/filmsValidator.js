import express from 'express'
import {REG, ERRORS} from '../constants/films'

const filmsValidator = express();

filmsValidator.use('(/:id)?', function (req, res, next) {
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
    if (!req.body.avatar) {
        res.locals.errors.avatar = ERRORS.avatar.there
    } else if (!REG.test(req.body.avatar)) {
        res.locals.errors.avatar = ERRORS.avatar.isLink
    }
    next();
}, function (req, res, next) {
    if (!req.body.gallery) {
        res.locals.errors.gallery = ERRORS.gallery.there
    } else if (!(req.body.gallery instanceof Array)) {
        res.locals.errors.gallery = ERRORS.gallery.isArray
    } else if (req.body.gallery.length < 4) {
        res.locals.errors.gallery = ERRORS.gallery.minLength
    } else {
        let result = req.body.gallery.filter((item) => REG.test(item));
        if (result.length !== req.body.gallery.length) {
            res.locals.errors.gallery = ERRORS.gallery.isLink
        }
    }
    next();
}, function (req, res, next) {
    if (req.body.rating && (req.body.rating <= 0 || req.body.rating >= 5)) {
        res.locals.errors.rating = ERRORS.rating.range
    }
    next();
}, function (req, res, next) {
    if (Object.keys(res.locals.errors).length !== 0) {
        res.status(422).send(res.locals.errors)
    }
    next(); 
});

export {filmsValidator}