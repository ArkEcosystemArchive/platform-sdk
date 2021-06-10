export interface UnspentTransaction {
	address: string;
	txId: string;
	outputIndex: number;
	script: string;
	satoshis: number;
}
