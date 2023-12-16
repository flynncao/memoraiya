var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
const router = express.Router();
import axios from 'axios';
import { analayse } from '../utils/index';
router.get("/cambridge", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const word = req.query.q;
    const requestURL = `https://dictionary.cambridge.org/dictionary/english/${word}/`;
    const vocab = {
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
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
    })
        .catch((error) => {
        // TODO: Generate meaningful error message, status code, etc to the client
        console.log('error', error);
        //reject(vocab);
        res.send(error);
    })
        .then((response) => {
        // TODO: Determine the type of Axios response
        const result = analayse(vocab, response);
        console.log('result :>> ', result);
        //resolve(vocab);
        res.send(result);
    });
}));
export default router;
