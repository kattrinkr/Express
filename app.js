import express from 'express'
import bodyPaser from 'body-parser'
import {router as filmsRouter} from './routes/films.js'
import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'

const ERROR_MESSAGE = { Error: 'URL not found' };
const app = express();
//let db;

async function app() {
    mongoose.connect('mongodb://users:a7465315@ds235181.mlab.com:35181/films');
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

app().catch(error => console.error(error.stack));
//export {db}

