var EXPRESS = require('express');
var ROUTER = EXPRESS.Router();

const BODY_PARSER = require('body-parser');
ROUTER.use(BODY_PARSER.json());
ROUTER.use(BODY_PARSER.urlencoded({ extended: true }));

ROUTER.route('/categories(/:id)?')
    .get(function(req, res) {
        if (req.params.id) {
            res.redirect('../categories')
        } else {
            res.send([])
        }
    })
    .post(function(req, res) {
        if (req.params.id) {
            res.redirect('../categories')
        } else {
            const MODIFY_OBJECT = {
                id: req.body.id,
                title: req.body.title,
                description: req.body.description,
                films: req.body.films
            }
            res.send(MODIFY_OBJECT);
        }
    })
    .put(function(req, res) {
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
    })
    .delete(function(req, res) {
        if (req.params.id) {
            const DELETED_OBJECT = {
                success: true,
                id: req.params.id
            }
            res.send(DELETED_OBJECT);
        } else {
            res.send(`Wrong ID!`)
        }
    });

module.exports = ROUTER;

