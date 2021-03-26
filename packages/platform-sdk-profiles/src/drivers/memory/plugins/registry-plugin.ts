import { IRegistryPlugin, IRegistryPluginAuthor } from "../../../contracts";

export class RegistryPlugin implements IRegistryPlugin {
	readonly #data: Record<string, any>;
	readonly #package: Record<string, any>;

	public constructor(data: Record<string, any>, pkg: Record<string, any>) {
		this.#data = data;
		this.#package = pkg;
	}

	public id(): string {
		return this.#data.name;
	}

	public name(): string {
		return this.id();
	}

	public alias(): string {
		return this.getMetaData("title");
	}

	public date(): string {
		return this.#data.date;
	}

	public version(): string {
		return this.#data.version;
	}

	public description(): string {
		return this.#data.description;
	}

	public author(): IRegistryPluginAuthor {
		return this.#data.author;
	}

	public sourceProvider(): any {
		for (const [provider, pattern] of Object.entries({
			github: /http(?:s)?:\/\/(?:www\.)?github\.com(\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}){2}/,
			gitlab: /http(?:s)?:\/\/(?:www\.)?gitlab\.com(\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}){2}/,
			bitbucket: /http(?:s)?:\/\/(?:www\.)?bitbucket\.com(\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}){2}/,
		})) {
			if (new RegExp(pattern).test(this.#data.links.repository)) {
				return {
					name: provider,
					url: this.#data.links.repository,
				};
			}
		}

		return null;
	}

	public logo(): string {
		return this.getMetaData("logo");
	}

	public images(): string[] {
		return this.getMetaData("images");
	}

	public categories(): string[] {
		return this.getMetaData("categories");
	}

	public permissions(): string[] {
		return this.getMetaData("permissions");
	}

	public urls(): string[] {
		return this.getMetaData("urls");
	}

	public minimumVersion(): string {
		return this.getMetaData("minimumVersion");
	}

	public toObject(): {
		id: string;
		name: string;
		alias: string;
		date: string;
		version: string;
		description: string;
		author: IRegistryPluginAuthor;
		sourceProvider: any;
		logo: string;
		images: string[];
		categories: string[];
		permissions: string[];
		urls: string[];
		minimumVersion: string;
	} {
		return {
			id: this.id(),
			name: this.name(),
			alias: this.alias(),
			date: this.date(),
			version: this.version(),
			description: this.description(),
			author: this.author(),
			sourceProvider: this.sourceProvider(),
			logo: this.logo(),
			images: this.images(),
			categories: this.categories(),
			permissions: this.permissions(),
			urls: this.urls(),
			minimumVersion: this.minimumVersion(),
		};
	}

	private getMetaData(key: string): any {
		if (this.#package[key]) {
			return this.#package[key];
		}

		if (this.#package["desktop-wallet"]) {
			if (this.#package["desktop-wallet"][key]) {
				return this.#package["desktop-wallet"][key];
			}
		}

		return undefined;
	}
}
