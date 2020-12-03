import * as Models from "../../models";
import { Resource } from "../resource";

export class Plugin extends Resource {
	public async all(id: number): Promise<Models.PaginatedResponse<Models.Plugin>> {
		return this.get(`users/${id}/plugins`);
	}
}
