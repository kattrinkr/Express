import Films from '../models/filmModel'

async function getFilms(req, res) {
    const page = req.params.page ? req.params.page : 1;
    const limit = 3;
    let prev = false;
    let next = false;
    let search = {};
    if (req.params.category) {
        search.category = req.params.category;
    } 
    try {
        Films.countDocuments(search, async function(err, count) {
            const filmItems = await Films.find(search)
            .limit(limit)
            .skip((page - 1) * limit);
            if (page * limit > limit) {
                prev = true
            }
            if (page * limit < count) {
                next = true
            }
            return res.render('../public/films.ejs', {films: filmItems, next: next, prev: prev, page: page, category: req.params.category});
        })
    } catch (err) {
        res.status(500).send(err);
    }
}

async function createFilm(req, res) {
    const film = new Films ({ 
        title: req.body.title,
        description: req.body.description,
        avatar: req.body.avatar,
        gallery: req.body.gallery,
        rating: req.body.rating,
        category: req.body.category
    })
    try {
        const filmItem = await film.save();
        res.send(filmItem);
    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send('Duplicate key');
        }
        res.status(500).send(err);
    } 
}

async function editFilm(req, res) {
    try {
        let filmItem = await Films.findById(req.params.id);
        if (!filmItem) {
            return res.status(404).send(`Item with ID ${req.params.id} is not exist`);
        } else {
            filmItem.title = req.body.title;
            filmItem. description = req.body.description;
            filmItem.avatar = req.body.avatar;
            filmItem.gallery = req.body.gallery;
            filmItem.rating = req.body.rating;
            filmItem.category = req.body.category;
             
            filmItem.save(function(err) {
                if (err) {
                    throw err
                } else {
                    res.send(req.body)
                }
            })
        }
    } catch (err) {
        res.status(500).send(`Item with ID ${req.params.id} is not exist`);
    }
}

async function removeFilm(req, res) {
    try {
        const filmItem = await Films.findOneAndRemove({_id: req.params.id});
        if (!filmItem) {
            return res.status(404).send(`Item with ID ${req.params.id} is not exist`);
        } else {
            const DELETED_OBJECT = {
                success: true,
                id: req.params.id
            }
            res.send(DELETED_OBJECT);
        }
    } catch (err) {
        res.status(500).send(`Item with ID ${req.params.id} is not exist`);
    }
}

export {getFilms, createFilm, editFilm, removeFilm}