/* istanbul ignore file */

import { Contracts } from "@arkecosystem/platform-sdk";
import { injectable } from "inversify";
import semver from "semver";
import { IPluginRegistry, IRegistryPlugin } from "../../../contracts";

import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { RegistryPlugin } from "./registry-plugin";

@injectable()
export class PluginRegistry implements IPluginRegistry {
	readonly #httpClient: Contracts.HttpClient;

	public constructor() {
		this.#httpClient = container.get<Contracts.HttpClient>(Identifiers.HttpClient);
	}

	/** {@inheritDoc IPluginRegistry.all} */
	public async all(): Promise<IRegistryPlugin[]> {
		const results: Promise<IRegistryPlugin>[] = [];

		let i = 0;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const { objects } = (
				await this.#httpClient.get("https://registry.npmjs.com/-/v1/search", {
					text: "keywords:" + ["@arkecosystem", "desktop-wallet", "plugin"].join(" "),
					from: i * 250,
					size: 250,
					t: +new Date(),
				})
			).json();

			if (objects === undefined) {
				break;
			}

			if (objects && objects.length === 0) {
				break;
			}

			for (const item of objects) {
				if (item.package.links?.repository === undefined) {
					continue;
				}

				results.push(this.#expand(item.package));
			}

			i++;
		}

		return this.#applyWhitelist(await Promise.all(results));
	}

	/** {@inheritDoc IPluginRegistry.size} */
	public async size(pkg: IRegistryPlugin): Promise<number> {
		const response = (await this.#httpClient.get(`https://registry.npmjs.com/${pkg.id()}`)).json();

		return response.versions[pkg.version()].dist?.unpackedSize;
	}

	/** {@inheritDoc IPluginRegistry.downloads} */
	public async downloads(pkg: IRegistryPlugin): Promise<number> {
		const response = await this.#httpClient.get(
			`https://api.npmjs.org/downloads/range/2005-01-01:${new Date().getFullYear() + 1}-01-01/${pkg.id()}`,
		);

		let result = 0;

		for (const { downloads } of response.json().downloads) {
			result += downloads;
		}

		return result;
	}

	async #applyWhitelist(plugins: IRegistryPlugin[]): Promise<IRegistryPlugin[]> {
		const whitelist: Record<string, string> = (
			await this.#httpClient.get(
				"https://raw.githubusercontent.com/ArkEcosystem/common/master/desktop-wallet/whitelist.json",
			)
		).json();

		const result: IRegistryPlugin[] = [];

		for (const plugin of plugins) {
			const range: string | undefined = whitelist[plugin.name()];

			if (range === undefined) {
				continue;
			}

			if (semver.satisfies(plugin.version(), range)) {
				result.push(plugin);
			}
		}

		return result;
	}

	async #expand(pkg: any): Promise<IRegistryPlugin> {
		return new RegistryPlugin(
			pkg,
			(
				await this.#httpClient.get(
					pkg.links.repository.replace("//github.com", "//raw.github.com") + "/master/package.json",
				)
			).json(),
		);
	}
}
