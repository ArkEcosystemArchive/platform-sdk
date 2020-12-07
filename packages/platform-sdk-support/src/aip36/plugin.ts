import { Builder } from "./builder";

export class Plugin extends Builder {
	public developedBy(value: string): void {
		this.set("plugin.developedBy", value);
	}

	public network(value: string): void {
		this.set("plugin.network", value);
	}

	public releaseDate(value: string): void {
		this.set("plugin.releaseDate", value);
	}

	public platform(value: string): void {
		this.set("plugin.platform", value);
	}

	public requirements(value: string): void {
		this.set("plugin.requirements", value);
	}
}
