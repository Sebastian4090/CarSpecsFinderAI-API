import express, { Express, urlencoded } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import compression from 'compression';
import cors from 'cors';

import routes from './routes';
import { connectDB } from './utils/connect';
import log from './utils/logger';

dotenv.config();

const PORT: Number = Number(process.env.PORT);

const app: Express = express();
app.use(express.json());
app.use(urlencoded({ extended: false }))
app.use(morgan('combined'));
app.use(compression());
app.use(cors());

app.get('/', (req, res) => {
    res.json("success");
})

app.listen(PORT, async () => {
    log.info(`Server is listening on port ${PORT}`);

    // database connection
    await connectDB();

    routes(app);
})