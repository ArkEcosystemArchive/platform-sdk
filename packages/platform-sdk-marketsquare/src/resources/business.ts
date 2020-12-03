import * as Models from "../models";
import { Resource } from "./resource";

export class Business extends Resource {
	public async all(query?: object): Promise<Models.PaginatedResponse<Models.Business>> {
		return this.get('businesses', query);
	}

	public async show(id: number): Promise<Models.Response<Models.Business>> {
		return this.get(`businesses/${id}`);
	}
}
