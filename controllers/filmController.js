//import {db} from '../app'
import mongoose from 'mongoose'

function getFilms(req, res) {
        const page = req.params.page ? req.params.page : 1;
        const limit = 3;
        let prev = false;
        let next = false;
        let search = {};
        if (req.params.category) {
            search.category = req.params.category;
        } else {
            search.category = {
                $ne: 'undefind'
            }
        }
        db.collection('films').countDocuments(search).then((total) => {
            db.collection('films').find(search).skip((page - 1) * limit).limit(limit).toArray(function(err, items) {
                if (err) {
                    return console.error(err)
                } else {
                    if (page * limit > limit) {
                        prev = true;
                    }
                    if (page * limit < total) {
                        next = true;
                    }
                    return res.render('../public/films.ejs', {films: items, next: next, prev: prev, page: page, category: req.params.category});
                }
            })
        })
}

var authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    title: String,
    description

});
 
var Author = mongoose.model('Author', authorSchema);

function createFilm(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
        db.collection('films').findOne({id: {$eq : req.body.id}}, (err, result) =>{
            if (!result) {
                db.collection('films').insertOne(req.body, (err, result) => {
                    if (err) {
                        return console.error(err)
                    } else {
                        res.send(req.body);
                    }
                })
            } else {
                res.send(`Item with ID ${req.body.id} is already exist`)
            }
        })
    } 
}

function editFilm(req, res) {
    console.log(req.method);
    if (Object.keys(res.locals.errors).length === 0) {
        db.collection('films').findOne({id: {$eq : req.params.id}}, (err, result) =>{
            if (err) {
                return console.error(err)
            } else {
                if (result) {
                    db.collection('films').updateOne({ id: req.params.id},{$set :req.body});
                    req.body.id = req.params.id;
                    res.send(req.body);
                } else {
                    res.send(`Item with ID ${req.params.id} is not exist`)
                }
            }
        })
    } 
}

function removeFilm(req, res) {
    console.log(req.method);
    db.collection('films').findOne({id: {$eq : req.params.id}}, (err, result) =>{
        if (result) {
            db.collection('films').deleteOne({ id: req.params.id}, (err, result) => {
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

export {getFilms, createFilm, editFilm, removeFilm}