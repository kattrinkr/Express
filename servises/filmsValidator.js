import {REG, ERRORS} from '../constants/films'

function filmsValidator (req, res, next) {
    let errors = {};
    if (!req.body.title) {
        errors.title = ERRORS.title.there
    } else if (req.body.title.length < 3) {
        errors.title = ERRORS.title.minLength
    }
    if (!req.body.description) {
        errors.description = ERRORS.description.there
    } else if (req.body.description.length < 3) {
        errors.description = ERRORS.description.minLength
    } else if (req.body.description.length > 500) {
        errors.description = ERRORS.description.maxLength
    }
    if (!req.body.avatar) {
        errors.avatar = ERRORS.avatar.there
    } else if (!REG.test(req.body.avatar)) {
        errors.avatar = ERRORS.avatar.isLink
    }
    if (!req.body.gallery) {
        errors.gallery = ERRORS.gallery.there
    } else if (!(req.body.gallery instanceof Array)) {
        errors.gallery = ERRORS.gallery.isArray
    } else if (req.body.gallery.length < 4) {
        errors.gallery = ERRORS.gallery.minLength
    } else {
        let result = req.body.gallery.filter((item) => REG.test(item));
        if (result.length !== req.body.gallery.length) {
            errors.gallery = ERRORS.gallery.isLink
        }
    }
    if (req.body.rating && (req.body.rating < 0 || req.body.rating > 5)) {
        errors.rating = ERRORS.rating.range
    }
    if (Object.keys(errors).length !== 0) {
        res.status(422).json(errors)
    } else {
        next()
    }
};

export {filmsValidator}