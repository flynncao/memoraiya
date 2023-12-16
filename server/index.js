import express from 'express';
import cambridge from './routes/cambridge';
import cors from 'cors';
const routes = [cambridge];
const app = express();
app.use(cors());
const port = 7001;
routes.forEach(route => {
    app.use(route);
});
app.get('/', (req, res) => {
    res.send('Welcome to Memoraiya Server-side!');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
