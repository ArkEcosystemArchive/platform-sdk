export interface LinkService {
	block(id: string): string;

	transaction(id: string): string;

	wallet(id: string): string;
}

export interface LinkServiceSchema {
	block: string;
	transaction: string;
	wallet: string;
}
