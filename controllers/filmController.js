import mongoose from 'mongoose'

var filmSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    avatar: String,
    gallery: Array,
    rating: Number,
    category: String
});
 
var Films = mongoose.model('Film', filmSchema);

function getFilms(req, res) {
        const page = req.params.page ? req.params.page : 1;
        const limit = 3;
        let prev = false;
        let next = false;
        let search = {};
        if (req.params.category) {
            search.category = req.params.category;
        } 
        Films.countDocuments(search, function(err, count) {
            Films.find(search)
            .limit(limit)
            .skip((page - 1) * limit)
            .exec( function(err, items) { 
                if (err) {
                    return console.error(err)
                } else {
                    if (page * limit > limit) {
                        prev = true;
                    }
                    if (page * limit < count) {
                        next = true;
                    }
                    return res.render('../public/films.ejs', {films: items, next: next, prev: prev, page: page, category: req.params.category});
                }
             })
        })
}

function createFilm(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
        let film = new Films ({ 
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            avatar: req.body.avatar,
            gallery: req.body.gallery,
            rating: req.body.rating,
            category: req.body.category
        })
        film.save(function(err) {
            if (err) {
                throw err
            } else {
                res.send(req.body)
            }
        })
    } 
}

function editFilm(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
        Films.findById(req.params.id, function(err, film) {
            if (err) {
                res.send(`Item with ID ${req.params.id} is not exist`)
            } else {
                film.title = req.body.title;
                film. description = req.body.description;
                film.avatar = req.body.avatar;
                film.gallery = req.body.gallery;
                film.rating = req.body.rating;
                film.category = req.body.category;
             
                film.save(function(err) {
                    if (err) {
                        throw err
                    } else {
                        res.send(req.body)
                    }
                })
            }
        });
    } 
}

function removeFilm(req, res) {
    console.log(req.method);
    Films.findById(req.params.id, function(err, film) {
        if (err || !film) {
            res.send(`Item with ID ${req.params.id} is not exist`)
        } else {
            film.remove(function(err) {
                if (err) {
                    throw err
                }
                else {
                    const DELETED_OBJECT = {
                        success: true,
                        id: req.params.id
                    }
                    res.send(DELETED_OBJECT);
                }
            })
        }
    });
}

export {getFilms, createFilm, editFilm, removeFilm}