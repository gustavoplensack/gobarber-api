import express from 'express';
import routes from './routes';

const app = express();

/**
 * Allowing usage of json data in the returns
 *
 */
app.use(express.json());

app.use(routes);

app.listen(3333,() => {

    console.log('Server running on port 3333!');
});
