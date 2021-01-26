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
				results.push(this.findById(item.package.name, item.package.date));
			}

			i++;
		}

		return Promise.all(results);
	}

	private async findById(id: string, date: string): Promise<RegistryPlugin> {
		const [details, downloads] = await Promise.all([
			await this.#httpClient.get(`https://registry.npmjs.com/${id}`),
			await this.#httpClient.get(
				`https://api.npmjs.org/downloads/range/2005-01-01:${new Date().getFullYear() + 1}-01-01/${id}`,
			),
		]);

		return new RegistryPlugin(details.json(), downloads.json().downloads, date);
	}
}
