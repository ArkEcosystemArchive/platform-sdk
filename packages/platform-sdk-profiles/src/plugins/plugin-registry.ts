/* istanbul ignore file */

import { Contracts } from "@arkecosystem/platform-sdk";

import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { RegistryPlugin } from "./plugin-registry.models";

export class PluginRegistry {
	readonly #httpClient: Contracts.HttpClient;

	public constructor() {
		this.#httpClient = container.get<Contracts.HttpClient>(Identifiers.HttpClient);
	}

	public async all(): Promise<RegistryPlugin[]> {
		const results: Promise<RegistryPlugin>[] = [];

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

				results.push(this.expand(item.package));
			}

			i++;
		}

		return Promise.all(results);
	}

	public async downloads(id: string): Promise<number> {
		const response = await this.#httpClient.get(
			`https://api.npmjs.org/downloads/range/2005-01-01:${new Date().getFullYear() + 1}-01-01/${id}`,
		);

		let result = 0;

		for (const { downloads } of response.json().downloads) {
			result += downloads;
		}

		return result;
	}

	private async expand(pkg: any): Promise<RegistryPlugin> {
		return new RegistryPlugin(pkg, (await this.#httpClient.get(
			pkg.links.repository.replace("//github.com", "//raw.github.com") + "/master/package.json",
		)).json());
	}
}
