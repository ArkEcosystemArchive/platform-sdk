import { Resource } from "../resource";

export class Module extends Resource {
	public async all(id: string): Promise<any> {
		return this.get(`users/${id}/modules`);
	}
}
