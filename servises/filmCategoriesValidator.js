import {ERRORS} from '../constants/filmCategories'

function filmCategoriesValidator (req, res, next) {
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
    if (!req.body.films) {
        errors.films = ERRORS.films.there
    } else if (!(req.body.films instanceof Array)) {
        errors.films = ERRORS.films.isArray
    }
    if (Object.keys(errors).length !== 0) {
        res.status(422).json(errors)
    } else {
        next()
    }
};

export {filmCategoriesValidator}