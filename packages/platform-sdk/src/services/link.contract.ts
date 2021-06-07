export interface LinkService {
	block(id: string): string;

	transaction(id: string): string;

	wallet(id: string): string;
}
