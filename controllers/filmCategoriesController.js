import mongoose from 'mongoose'

var categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    films: Array
});
 
var Category = mongoose.model('Film_Categories', categorySchema);

function getFilmCategories(req, res) {
    console.log(req.method);
    if (req.params.id) {
        res.redirect('')
    } else {
        const page = req.params.page ? req.params.page : 1;
        const limit = 3;
        const num = page * limit;
        let prev = false;
        let next = false;
        Category.countDocuments({}, function(err, count) {
            Category.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .exec( function(err, items) { 
                if (err) {
                    return console.error(err)
                } else {
                    if (num > limit) {
                        prev = true;
                    }
                    if (num < count) {
                        next = true;
                    }
                    res.render('../public/filmCategories.ejs', {filmCategories: items, next: next, prev: prev, page: page});  
                }      
            })
        })
    }
}

function createFilmCategory(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
        let category = new Category ({ 
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            films: req.body.films
        })
        category.save(function(err) {
            if (err) {
                throw err
            } else {
                res.send(req.body)
            }
        })
    }
}

function editFilmCategory(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
        Category.findById(req.params.id, function(err, category) {
            if (err) {
                res.send(`Item with ID ${req.params.id} is not exist`)
            } else {
                category.title = req.body.title;
                category. description = req.body.description;
                category.films = req.body.films;
             
                category.save(function(err) {
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

function removeFilmCategory(req, res) {
    console.log(req.method);
    Category.findById(req.params.id, function(err, category) {
        if (err || !category) {
            res.send(`Item with ID ${req.params.id} is not exist`)
        } else {
            category.remove(function(err) {
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

export {getFilmCategories, createFilmCategory, editFilmCategory, removeFilmCategory}