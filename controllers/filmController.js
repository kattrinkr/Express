function getFilms(req, res) {
    console.log(req.method);
    if (req.params.id) {
        res.redirect('')
    } else {
        res.send([])
    }
}

function createFilm(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
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
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
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
    } 
}

function removeFilm(req, res) {
    console.log(req.method);
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