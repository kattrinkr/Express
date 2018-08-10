import express from 'express'
import bodyPaser from 'body-parser'
import {router as filmsRouter} from './routes/films.js'

const ERROR_MESSAGE = { Error: 'URL not found' };
const app = express();

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use('/api/films', filmsRouter);

app.use(function(req, res) {
    res.status(404).json(ERROR_MESSAGE);
})

app.listen(process.env.PORT || 3000, () => console.log('App is listening!'));