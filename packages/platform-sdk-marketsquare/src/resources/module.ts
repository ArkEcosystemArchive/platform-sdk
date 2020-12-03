import { Resource } from "./resource";

export class Module extends Resource {
	public async all(query?: object): Promise<any> {
		return this.get('modules', query);
	}

	public async show(id: string): Promise<any> {
		return this.get(`modules/${id}`);
	}

	public async versions(id: string, query?: object): Promise<any> {
		return this.get(`modules/${id}/versions`, query);
	}
}
