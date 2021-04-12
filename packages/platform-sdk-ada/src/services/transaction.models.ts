export interface UnspentTransaction {
	address: string;
	index: string;
	transaction: {
		hash: string;
	};
	value: string;
}
