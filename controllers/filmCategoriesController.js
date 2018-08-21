import mongoose from 'mongoose'

var categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    films: Array
});
 
var Category = mongoose.model('Film_Categories', categorySchema);

async function getFilmCategories(req, res) {
    console.log(req.method);
    const page = req.params.page ? req.params.page : 1;
    const limit = 3;
    const num = page * limit;
    let prev = false;
    let next = false;
    try {
        await Category.countDocuments({}, function(err, count) {
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
        } catch (err) {
            res.status(500).send(err);
        }
}

async function createFilmCategory(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
        let category = new Category ({ 
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            films: req.body.films
        })
        try {
            await category.save();
            res.send(req.body);
        } catch (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.status(409).send('Duplicate key');
            }
            res.status(500).send(err);
        }
    }
}

async function editFilmCategory(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
        try {
            let categoryItem = await Category.findById(req.params.id);
            if (!categoryItem) {
                return res.status(404).send(`Item with ID ${req.params.id} is not exist`);
            } else {
                categoryItem.title = req.body.title;
                categoryItem.description = req.body.description;
                categoryItem.films = req.body.films;
             
                categoryItem.save(function(err) {
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
}

async function removeFilmCategory(req, res) {
    console.log(req.method);
    try {
        let categoryItem = await Category.findOneAndRemove({_id: req.params.id});
        if (!categoryItem) {
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

export {getFilmCategories, createFilmCategory, editFilmCategory, removeFilmCategory}