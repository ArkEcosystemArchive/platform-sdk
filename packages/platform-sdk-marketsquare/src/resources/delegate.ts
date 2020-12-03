import * as Models from "../models";
import { Resource } from "./resource";

export class Delegate extends Resource {
	public async all(query?: object): Promise<Models.PaginatedResponse<Models.Delegate>> {
		return this.get("delegates", query);
	}

	public async show(id: number): Promise<Models.Response<Models.Delegate>> {
		return this.get(`delegates/${id}`);
	}
}
