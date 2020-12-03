import { Resource } from "./resource";

export class Business extends Resource {
	public async all(query?: object): Promise<any> {
		return this.get('businesses', query);
	}

	public async show(id: string): Promise<any> {
		return this.get(`businesses/${id}`);
	}
}
