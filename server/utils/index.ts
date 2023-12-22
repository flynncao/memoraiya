
import cheerio from "cheerio";
import { Vocab } from '../types/Vocab';

/**
 * Analyse the HTML of the page and store the result in the vocab object
 * @param vocab Store the result of the analysis
 * @param response The response from the Axios HTTP request, aka the HTML of the page
 * @returns 
 */
export const analayse = (vocab: Vocab, response: any) => {
	// TODO: Refactor: Update to newest verion of axios api
	const $ = cheerio.load(response.data);
	const title = $('div.di-title:first>span>span').text();
	vocab.title = title;
	const pos = $(
		'div.posgram.dpos-g.hdib.lmr-5:first span.pos.dpos',
	).text();
	const dpos = $(
		'div.posgram.dpos-g.hdib.lmr-5:first span.gram.dgram',
	).text();
	vocab.pos = pos;
	vocab.dpos = dpos;
	const uk_pron = $('span.uk.dpron-i:first span.ipa.dipa.lpl-1').text();
	const us_pron = $('span.us.dpron-i:first span.ipa.dipa.lpl-1').text();
	vocab.uk_pron = uk_pron;
	vocab.us_pron = us_pron;
	$('div.def-block.ddef_block').each((i, elem) => {
		const description = $(elem).find('div.def.ddef_d.db').text();
		vocab.definitions.push({ description, examples: [] });
		const subList = $(elem).find(
			'div.def-body.ddef_b div.examp.dexamp',
		);
		if (subList.length !== 0) {
			subList.each((j, item) => {
				vocab.definitions[i].examples.push($(item).text());
			});
		}
	});
	$('#dataset-example')
		.find('div.lbb.lb-cm.lpt-10')
		.each((i, elem) => {
			const dataExample = $(elem)
				.find('span.deg')
				.text()
				.trim()
				.replace(/\n/g, '');
			vocab.dataset_examples.push(dataExample);
		});
	console.log('vocab :>> ', vocab);
	return vocab
}
