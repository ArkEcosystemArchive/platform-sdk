export interface LinkService {
	__destruct(): Promise<void>;

	block(id: string): string;

	transaction(id: string): string;

	wallet(id: string): string;
}
