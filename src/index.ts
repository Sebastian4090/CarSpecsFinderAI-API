import express, { Express, urlencoded } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import compression from 'compression';

import routes from './routes';
import connect from './utils/connect';
import log from './utils/logger';

dotenv.config();

const PORT: Number = Number(process.env.PORT);

const app: Express = express();
app.use(express.json());
app.use(urlencoded({ extended: false }))
app.use(morgan('combined'));
app.use(compression());

app.get('/', (req, res) => {
    res.json("success");
})

app.listen(PORT, async () => {
    log.info(`Server is listening on port ${PORT}`);


    await connect();
    routes(app);
})