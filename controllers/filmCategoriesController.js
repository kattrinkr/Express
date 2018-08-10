function getQuery(req, res) {
    if (req.params.id) {
        res.redirect('')
    } else {
        res.send([])
    }
}

function postQuery(req, res) {
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

function putQuery(req, res) {
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

function deleteQuery(req, res) {
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

export {getQuery, postQuery, putQuery, deleteQuery}