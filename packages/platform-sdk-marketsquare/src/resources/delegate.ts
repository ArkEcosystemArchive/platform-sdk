import { Resource } from "./resource";

export class Delegate extends Resource {
	public async all(query?: object): Promise<any> {
		return this.get('delegates', query);
	}

	public async show(id: string): Promise<any> {
		return this.get(`delegates/${id}`);
	}
}
