import * as Models from "../../models";
import { Resource } from "../resource";

export class Product extends Resource {
	public async all(id: number): Promise<Models.PaginatedResponse<Models.Product>> {
		return this.get(`users/${id}/products`);
	}
}
