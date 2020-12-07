import { Builder } from "./builder";

export class Module extends Builder {
	public developedBy(value: string): void {
		this.set("module.developedBy", value);
	}

	public network(value: string): void {
		this.set("module.network", value);
	}

	public releaseDate(value: string): void {
		this.set("module.releaseDate", value);
	}

	public platform(value: string): void {
		this.set("module.platform", value);
	}

	public requirements(value: string): void {
		this.set("module.requirements", value);
	}
}
