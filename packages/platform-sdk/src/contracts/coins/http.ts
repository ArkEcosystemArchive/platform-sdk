export interface HttpClient {
	get(path: string, query?: object): Promise<Record<string, any>>;

	post(path: string, body: object, headers?: object);
}
