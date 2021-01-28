/* istanbul ignore file */

import { Contracts } from "@arkecosystem/platform-sdk";

import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { ExpandedRegistryPlugin, PartialRegistryPlugin } from "./plugin-registry.models";

export class PluginRegistry {
	readonly #httpClient: Contracts.HttpClient;

	public constructor() {
		this.#httpClient = container.get<Contracts.HttpClient>(Identifiers.HttpClient);
	}

	public async all(): Promise<PartialRegistryPlugin[]> {
		const results: PartialRegistryPlugin[] = [];

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
				// If a plugin doesn't have it's code public we will ignore it.
				if (item.package.links?.repository === undefined) {
					continue;
				}

				results.push(new PartialRegistryPlugin(item.package));
			}

			i++;
		}

		return results;
	}

	public async expand(plugin: PartialRegistryPlugin): Promise<ExpandedRegistryPlugin> {
		const [details, downloads] = await Promise.all([
			await this.#httpClient.get(`https://registry.npmjs.com/${plugin.id()}`),
			await this.#httpClient.get(
				`https://api.npmjs.org/downloads/range/2005-01-01:${new Date().getFullYear() + 1}-01-01/${plugin.id()}`,
			),
		]);

		return new ExpandedRegistryPlugin(details.json(), downloads.json().downloads, plugin.date());
	}
}
