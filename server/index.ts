import express, { Express, NextFunction, Request, Response } from 'express';
import cambridge from './routes/cambridge';
import cors from 'cors'
const routes = [cambridge]

const app: Express = express();
app.use(cors())

const port = 7001;
routes.forEach(route => {
	app.use(route)
})


app.get('/', (req: Request, res: Response) => {
	res.send('Welcome to Memoraiya Server-side!');
});


// Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).send(err.message);
	next()
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


