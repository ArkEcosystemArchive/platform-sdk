import { Builder } from "./builder";

export class Meta extends Builder {
	public description(value: string): void {
		this.set("meta.description", value);
	}

	public displayName(value: string): void {
		this.set("meta.displayName", value);
	}

	public website(value: string): void {
		this.set("meta.website", value);
	}
}
