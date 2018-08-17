import {REG, ERRORS} from '../constants/films'

function filmsValidator (req, res, next) {
    res.locals.errors = {};
    if ((req.method === 'POST' && !req.body.id) || (req.method === 'PUT' && !req.params.id)) {
        res.locals.errors.id = ERRORS.id.there
    }
    if (!req.body.title) {
        res.locals.errors.title = ERRORS.title.there
    } else if (req.body.title.length < 3) {
        res.locals.errors.title = ERRORS.title.minLength
    }
    if (!req.body.description) {
        res.locals.errors.description = ERRORS.description.there
    } else if (req.body.description.length < 3) {
        res.locals.errors.description = ERRORS.description.minLength
    } else if (req.body.description.length > 500) {
        res.locals.errors.description = ERRORS.description.maxLength
    }
    if (!req.body.avatar) {
        res.locals.errors.avatar = ERRORS.avatar.there
    } else if (!REG.test(req.body.avatar)) {
        res.locals.errors.avatar = ERRORS.avatar.isLink
    }
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
    if (req.body.rating && (req.body.rating < 0 || req.body.rating > 5)) {
        res.locals.errors.rating = ERRORS.rating.range
    }
    if (Object.keys(res.locals.errors).length !== 0) {
        res.status(422).json(res.locals.errors)
    }
    next(); 
};

export {filmsValidator}