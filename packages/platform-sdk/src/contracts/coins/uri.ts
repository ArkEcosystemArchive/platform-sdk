export interface URIService {
	serialize(data: object): string;

	deserialize(data: string): object;
}
