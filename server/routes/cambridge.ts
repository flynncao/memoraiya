import express from "express"
const router = express.Router()
import { Response, Request, NextFunction } from "express"
import { Vocab } from '../types/Vocab';
import axios from 'axios';
import { analayse } from '../utils/index';
router.get("/cambridge", async (req: Request, res: Response, next: NextFunction) => {
	const word = req.query.q
	const requestURL = `https://dictionary.cambridge.org/dictionary/english/${word}/`;
	const vocab: Vocab = {
		title: '',
		pos: '',
		dpos: '',
		uk_pron: '',
		us_pron: '',
		definitions: [],
		dataset_examples: [],
	};
	axios
		.get(requestURL, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
			},
		})
		.catch((error) => {
			// async error handling
			console.log('error from remote server:>> ', error);
			next(error);
		})
		.then((response: any) => {
			if (response.status !== 200) {
				return res.status(503).send('Service unavailable.')
			}
			const result = analayse(vocab, response);
			console.log('result :>> ', result);
			if (result.definitions.length === 0)
				return res.status(404).send('Word not found.')
			return res.status(200).send(result);
		});
})


export default router
