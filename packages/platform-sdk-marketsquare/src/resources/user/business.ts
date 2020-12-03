import { Resource } from "../resource";

export class Business extends Resource {
	public async all(id: string): Promise<any> {
		return this.get(`users/${id}/businesses`);
	}
}
