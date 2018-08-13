function getFilms(req, res) {
    if (req.params.id) {
        res.redirect('')
    } else {
        res.send([])
    }
}

function createFilm(req, res) {
    if (req.params.id) {
        res.redirect('')
    } else {
        const MODIFY_OBJECT = {
            id: req.body.id,
            title: req.body.title,
            description: req.body.description,
            avatar: req.body.avatar,
            gallery: req.body.gallery,
            rating: req.body.rating,
            category: req.body.category
        }
        res.send(MODIFY_OBJECT);
    }
}

function editFilm(req, res) {
    if (req.params.id) {
        const MODIFY_OBJECT = {
            id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            avatar: req.body.avatar,
            gallery: req.body.gallery,
            rating: req.body.rating,
            category: req.body.category
        }
        res.send(MODIFY_OBJECT);
    } else {
        res.send(`Wrong ID!`)
    }
}

function removeFilm(req, res) {
    if (req.params.id) {
        const DELETED_OBJECT = {
            success: true,
            id: req.params.id
        }
        res.send(DELETED_OBJECT);
    } else {
        res.send('Wrong ID!');
    }
}

export {getFilms, createFilm, editFilm, removeFilm}