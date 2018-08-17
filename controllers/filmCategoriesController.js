import {db} from '../app'

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
        db.collection('filmCategories').countDocuments(function(err, total) {
            db.collection('filmCategories').find().skip((page - 1) * limit).limit(limit).toArray(function(err, items) {
                if (err) {
                    return console.error(err)
                } else {
                    if (num > limit) {
                        prev = true;
                    }
                    if (num < total) {
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
        db.collection('filmCategories').findOne({id: {$eq : req.body.id}}, (err, result) =>{
            if (!result) {
                db.collection('filmCategories').insertOne(req.body, (err, result) => {
                    if (err) {
                        return console.error(err)
                    } else {
                        res.send(req.body)
                    }
                })
            } else {
                res.send(`Item with ID ${req.body.id} is already exist`)
            }
        })
    }
}

function editFilmCategory(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
        db.collection('filmCategories').findOne({id: {$eq : req.params.id}}, (err, result) =>{
            if (err) {
                return console.error(err)
            } else {
                if (result) {
                    db.collection('filmCategories').updateOne({ id: req.params.id},{$set :req.body});
                    req.body.id = req.params.id;
                    res.send(req.body);
                } else {
                    res.send(`Item with ID ${req.params.id} is not exist`)
                }
            }
        })
    }
}

function removeFilmCategory(req, res) {
    console.log(req.method);
    db.collection('filmCategories').findOne({id: {$eq : req.params.id}}, (err, result) =>{
        if (result) {
            db.collection('filmCategories').deleteOne({ id: req.params.id}, (err, result) => {
                if (err) {
                    return console.error(err)
                } else {
                    const DELETED_OBJECT = {
                        success: true,
                        id: req.params.id
                    }
                    res.send(DELETED_OBJECT);
                }
            })
        } else {
            res.send(`Item with ID ${req.params.id} is not exist`)
        }
    })
}

export {getFilmCategories, createFilmCategory, editFilmCategory, removeFilmCategory}