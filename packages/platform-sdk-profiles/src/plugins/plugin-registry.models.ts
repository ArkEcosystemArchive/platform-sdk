/* istanbul ignore file */

export interface RegistryPluginManifest {
	logo?: string;
	title?: string;
	images?: string[]
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

export interface RegistryPluginProperties {
	name: string;
	version: string;
	description?: string;
	keywords?: string[];
	homepage?: { [key: string]: any } | string;
	bugs?: { [key: string]: any };
	license?: string;
	author?: { [key: string]: any } | string;
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
	readonly #data: any;
	readonly #downloads: any;
	readonly #date: string;

	public constructor(data: any, downloads: any, date: string) {
		this.#data = data;
		this.#downloads = downloads;
		this.#date = date;
	}

	public name(): string {
		return this.#data.name;
	}

	public alias(): string {
		return this.getMetaData("title");
	}

	public date(): string {
		return this.#date;
	}

	public version(): string {
		return this.#data["dist-tags"].latest;
	}

	public description(): string {
		return this.#data.description;
	}

	public author() {
		return this.#data.author;
	}

	public installSize() {
		return this.getLatestVersion().dist?.unpackedSize;
	}

	public downloads(): number {
		let result = 0;

		for (const { downloads } of this.#downloads) {
			result += downloads;
		}

		return result;
	}

	public sourceProvider(): any {
		for (const [provider, pattern] of Object.entries({
			github: /http(?:s)?:\/\/(?:www\.)?github\.com(\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}){2}/,
			gitlab: /http(?:s)?:\/\/(?:www\.)?gitlab\.com(\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}){2}/,
			bitbucket: /http(?:s)?:\/\/(?:www\.)?bitbucket\.com(\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}){2}/,
		})) {
			if (new RegExp(pattern).test(this.#data.homepage)) {
				return {
					name: provider,
					url: this.#data.repository.url,
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

	public versions(): string[] {
		return Object.keys(this.#data.versions);
	}

	public getLatestVersion(): RegistryPluginProperties {
		return this.#data.versions[Object.keys(this.#data.versions)[Object.keys(this.#data.versions).length - 1]];
	}

	private getMetaData(key: string): any {
		const latestVersion = this.getLatestVersion();

		if (latestVersion[key]) {
			return latestVersion[key];
		}

		if (latestVersion["desktop-wallet"]) {
			if (latestVersion["desktop-wallet"][key]) {
				return latestVersion["desktop-wallet"][key];
			}
		}

		return undefined;
	}
}
