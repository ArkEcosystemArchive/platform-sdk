import { Resource } from "../resource";

export class Delegate extends Resource {
	public async all(id: string): Promise<any> {
		return this.get(`users/${id}/delegates`);
	}
}
