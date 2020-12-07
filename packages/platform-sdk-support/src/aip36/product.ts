import { Builder } from "./builder";

export class Product extends Builder {
	public developedBy(value: string): void {
		this.set("product.developedBy", value);
	}

	public network(value: string): void {
		this.set("product.network", value);
	}

	public releaseDate(value: string): void {
		this.set("product.releaseDate", value);
	}

	public platform(value: string): void {
		this.set("product.platform", value);
	}
}
