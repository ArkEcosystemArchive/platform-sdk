import { IRegistryPlugin, IRegistryPluginAuthor } from "../../../contracts";

export class RegistryPlugin implements IRegistryPlugin {
	readonly #data: Record<string, any>;
	readonly #package: Record<string, any>;

	/** {@inheritDoc IRegistryPlugin.constructor} */
	public constructor(data: Record<string, any>, pkg: Record<string, any>) {
		this.#data = data;
		this.#package = pkg;
	}

	/** {@inheritDoc IRegistryPlugin.id} */
	public id(): string {
		return this.#data.name;
	}

	/** {@inheritDoc IRegistryPlugin.name} */
	public name(): string {
		return this.id();
	}

	/** {@inheritDoc IRegistryPlugin.alias} */
	public alias(): string {
		return this.#getMetaData("title");
	}

	/** {@inheritDoc IRegistryPlugin.date} */
	public date(): string {
		return this.#data.date;
	}

	/** {@inheritDoc IRegistryPlugin.version} */
	public version(): string {
		return this.#data.version;
	}

	/** {@inheritDoc IRegistryPlugin.description} */
	public description(): string {
		return this.#data.description;
	}

	/** {@inheritDoc IRegistryPlugin.author} */
	public author(): IRegistryPluginAuthor {
		return this.#data.author;
	}

	/** {@inheritDoc IRegistryPlugin.sourceProvider} */
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

	/** {@inheritDoc IRegistryPlugin.logo} */
	public logo(): string {
		return this.#getMetaData("logo");
	}

	/** {@inheritDoc IRegistryPlugin.images} */
	public images(): string[] {
		return this.#getMetaData("images");
	}

	/** {@inheritDoc IRegistryPlugin.categories} */
	public categories(): string[] {
		return this.#getMetaData("categories");
	}

	/** {@inheritDoc IRegistryPlugin.permissions} */
	public permissions(): string[] {
		return this.#getMetaData("permissions");
	}

	/** {@inheritDoc IRegistryPlugin.urls} */
	public urls(): string[] {
		return this.#getMetaData("urls");
	}

	/** {@inheritDoc IRegistryPlugin.minimumVersion} */
	public minimumVersion(): string {
		return this.#getMetaData("minimumVersion");
	}

	/** {@inheritDoc IRegistryPlugin.toObject} */
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

	#getMetaData(key: string): any {
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
