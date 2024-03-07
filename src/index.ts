import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';

const PORT: Number = 3000;

const app: Express = express();
app.use(morgan('combined'));
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('success');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

