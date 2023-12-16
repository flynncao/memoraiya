import express from "express"
const router = express.Router()
import { Response, Request } from "express"
import { Vocab } from '../types/Vocab';
import axios from 'axios';
import { analayse } from '../utils/index';
router.get("/cambridge", async (req: Request, res:Response) =>{
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
		// TODO: Generate meaningful error message, status code, etc to the client
		console.log('error', error);
		//reject(vocab);
		res.send(error)
	})
	.then((response: any) => {
		// TODO: Determine the type of Axios response
		const result = analayse(vocab, response)
		console.log('result :>> ', result);
		//resolve(vocab);
		res.send(result)
	});
})


export default router
