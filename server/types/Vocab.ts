import { Definition } from './Definition';

export interface Vocab {
	title: string;
	pos: string;
	dpos: string;
	uk_pron: string;
	us_pron: string;
	definitions: Definition[];
	dataset_examples: string[];
}
