import * as Models from "../models";
import { Resource } from "./resource";

export class Module extends Resource {
	public async all(query?: object): Promise<Models.PaginatedResponse<Models.Module>> {
		return this.get("modules", query);
	}

	public async show(id: number): Promise<Models.Response<Models.Module>> {
		return this.get(`modules/${id}`);
	}

	public async versions(id: number, query?: object): Promise<Models.PaginatedResponse<Models.PackageVersion>> {
		return this.get(`modules/${id}/versions`, query);
	}
}
