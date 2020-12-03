import * as Models from "../models";
import { Resource } from "./resource";

export class Plugin extends Resource {
	public async all(query?: object): Promise<Models.PaginatedResponse<Models.Plugin>> {
		return this.get('plugins', query);
	}

	public async show(id: string): Promise<Models.Response<Models.Plugin>> {
		return this.get(`plugins/${id}`);
	}

	public async versions(id: string, query?: object): Promise<Models.PaginatedResponse<Models.PackageVersion>> {
		return this.get(`plugins/${id}/versions`, query);
	}
}
