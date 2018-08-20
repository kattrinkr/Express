import express from 'express'
import bodyPaser from 'body-parser'
import {router as filmsRouter} from './routes/films.js'
import mongoose from 'mongoose'

const ERROR_MESSAGE = { Error: 'URL not found' };
const app = express();

async function run() {
    mongoose.connect('mongodb://users:aA7465315@ds125472.mlab.com:25472/film_gallery', { useNewUrlParser: true });
    await mongoose.connection.dropDatabase();
    app.use(express.static(__dirname + '/public'))
    app.use(bodyPaser.json());
    app.use(bodyPaser.urlencoded({ extended: true }));
    app.use('/api/films', filmsRouter);

    app.use(function(req, res) {
        res.status(404).json(ERROR_MESSAGE);
    })
    app.listen(process.env.PORT || 3000, () => console.log('App is listening!'));
}
run().catch(error => console.error(error.stack));
