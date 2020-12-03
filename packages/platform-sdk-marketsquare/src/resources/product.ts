import { Resource } from "./resource";

export class Product extends Resource {
	public async all(query?: object): Promise<any> {
		return this.get('products', query);
	}

	public async show(id: string): Promise<any> {
		return this.get(`products/${id}`);
	}
}
