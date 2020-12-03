import * as Models from "../../models";
import { Resource } from "../resource";

export class Module extends Resource {
	public async all(id: string): Promise<Models.PaginatedResponse<Models.Module>> {
		return this.get(`users/${id}/modules`);
	}
}
