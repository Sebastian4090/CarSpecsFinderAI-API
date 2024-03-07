import express from 'express';
import morgan from 'morgan';
const PORT = 3000;
const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('success');
});
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map