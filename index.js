const express = require('express');
const APP = express();
const ERROR_MESSAGE = { Error: 'URL not found' };

APP.get('/api/hello-world/:name', function (req, res) {
    res.render('index.ejs', {name: req.params.name});
})

APP.use(function(req, res) {
    res.status(404).json(ERROR_MESSAGE);
})

APP.listen(process.env.PORT || 3000, () => console.log('App is listening!'));
