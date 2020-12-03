import { Resource } from "./resource";

export class Plugin extends Resource {
	public async all(query?: object): Promise<any> {
		return this.get('plugins', query);
	}

	public async show(id: string): Promise<any> {
		return this.get(`plugins/${id}`);
	}

	public async versions(id: string, query?: object): Promise<any> {
		return this.get(`plugins/${id}/versions`, query);
	}
}
