const express = require('express');
const APP = express();
const ERROR_MESSAGE = { Error: 'URL not found' };

const FILMS_ROUTER = require('./routes/films.js');
const CATEGORIES_ROUTER = require('./routes/filmCategories.js');

APP.use('/api/films', CATEGORIES_ROUTER);
APP.use('/api', FILMS_ROUTER);

APP.use(function(req, res) {
    res.status(404).json(ERROR_MESSAGE);
})

APP.listen(process.env.PORT || 3000, () => console.log('App is listening!'));
