import * as Models from "../../models";
import { Resource } from "../resource";

export class Delegate extends Resource {
	public async all(id: string): Promise<Models.PaginatedResponse<Models.Delegate>> {
		return this.get(`users/${id}/delegates`);
	}
}
