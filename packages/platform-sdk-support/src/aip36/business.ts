import { Builder } from "./builder";

export class Business extends Builder {
	public type(value: string): void {
		this.set("business.type", value);
	}
}
