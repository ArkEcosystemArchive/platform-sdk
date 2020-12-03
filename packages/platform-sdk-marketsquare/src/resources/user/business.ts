import * as Models from "../../models";
import { Resource } from "../resource";

export class Business extends Resource {
	public async all(id: number): Promise<Models.PaginatedResponse<Models.Business>> {
		return this.get(`users/${id}/businesses`);
	}
}
