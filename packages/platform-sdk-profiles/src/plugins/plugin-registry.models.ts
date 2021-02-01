/* istanbul ignore file */

export interface RegistryPluginManifest {
	logo?: string;
	title?: string;
	images?: string[];
	categories?: string[];
	permissions?: string[];
	urls?: any[];
	minVersion?: string;
}

export interface RegistryPluginSourceControl {
	type: string;
	value: string;
}

export interface RegistryPluginSocialMedia {
	type: string;
	value: string;
}

export interface RegistryPluginImage {
	type: string;
	value: string;
}

export interface RegistryPluginMeta {
	displayName?: string;
	description?: string;
}

export interface RegistryPluginAip36 {
	sourceControl?: RegistryPluginSourceControl[];
	socialMedia?: RegistryPluginSocialMedia[];
	images?: RegistryPluginImage[];
	meta?: RegistryPluginMeta;
}

export interface RegistryPluginVersion {
	id: number;
	name: string;
	released_at: Date;
	is_verified: boolean;
}

type RegistryPluginAuthor = { [key: string]: any } | string;

export interface RegistryPluginProperties {
	name: string;
	version: string;
	description?: string;
	keywords?: string[];
	homepage?: { [key: string]: any } | string;
	bugs?: { [key: string]: any };
	license?: string;
	author?: RegistryPluginAuthor;
	contributors?: ({ [key: string]: any } | string)[];
	maintainers?: ({ [key: string]: any } | string)[];
	repository?: { [key: string]: any } | string;
	dist?: {
		shasum?: string;
		tarball?: string;
		unpackedSize?: number;
		[key: string]: any;
	};
	"desktop-wallet"?: RegistryPluginManifest;
	[key: string]: any;
}

export class RegistryPlugin {
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

	public author(): RegistryPluginAuthor {
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
		author: RegistryPluginAuthor;
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
