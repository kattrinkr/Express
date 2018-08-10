const express = require('express');
const APP = express();
const ERROR_MESSAGE = { Error: 'URL not found' };

APP.set('view engine', 'ejs');
APP.listen(process.env.PORT || 3000, () => console.log('App is listening on port 3000!'));

APP.get('/api/hello-world/:name', function (req, res) {
    if (req.accepts('html')) {
        res.render("index", {name: req.params.name});
    }
   
})

APP.get('*', function (req, res) {
    res.status(404);

    if (req.accepts('json')) {
        res.send(ERROR_MESSAGE);
    }
})
