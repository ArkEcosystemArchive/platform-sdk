import * as Models from "../models";
import { Resource } from "./resource";

export class Product extends Resource {
	public async all(query?: object): Promise<Models.PaginatedResponse<Models.Product>> {
		return this.get('products', query);
	}

	public async show(id: number): Promise<Models.Response<Models.Product>> {
		return this.get(`products/${id}`);
	}
}
