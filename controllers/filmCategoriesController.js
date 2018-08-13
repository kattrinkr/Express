function getFilmCategories(req, res) {
    if (req.params.id) {
        res.redirect('')
    } else {
        res.send([])
    }
}

function createFilmCategory(req, res) {
    if (req.params.id) {
        res.redirect('')
    } else {
        const MODIFY_OBJECT = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            films: req.body.films
        }
        res.send(MODIFY_OBJECT);
    }
}

function editFilmCategory(req, res) {
    if (req.params.id) {
        const MODIFY_OBJECT = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            films: req.body.films
        }
        res.send(MODIFY_OBJECT);
    } else {
        res.send(`Wrong ID!`)
    }
}

function removeFilmCategory(req, res) {
    if (req.params.id) {
        const DELETED_OBJECT = {
            success: true,
            id: req.params.id
        }
        res.send(DELETED_OBJECT);
    } else {
        res.send(`Wrong ID!`)
    }
}

export {getFilmCategories, createFilmCategory, editFilmCategory, removeFilmCategory}