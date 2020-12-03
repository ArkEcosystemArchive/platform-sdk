import { Contracts } from "@arkecosystem/platform-sdk";

import { AIP36 } from "./resources/aip36";
import { Auth } from "./resources/auth";
import { Business } from "./resources/business";
import { Delegate } from "./resources/delegate";
import { Module } from "./resources/module";
import { Plugin } from "./resources/plugin";
import { Product } from "./resources/product";
import { User } from "./resources/user";

export class Client {
	readonly #client: Contracts.HttpClient;

	public constructor(client: Contracts.HttpClient) {
		this.#client = client;
	}

	public withBaseUrl(baseUrl: string): Client {
		this.#client.baseUrl(baseUrl);

		return this;
	}

	public withToken(token: string): Client {
		this.#client.withHeaders({ Authorization: `Bearer ${token}` });

		return this;
	}

	public aip36(): AIP36 {
		return new AIP36(this.#client);
	}

	public auth(): Auth {
		return new Auth(this.#client);
	}

	public business(): Business {
		return new Business(this.#client);
	}

	public delegate(): Delegate {
		return new Delegate(this.#client);
	}

	public module(): Module {
		return new Module(this.#client);
	}

	public plugin(): Plugin {
		return new Plugin(this.#client);
	}

	public product(): Product {
		return new Product(this.#client);
	}

	public user(): User {
		return new User(this.#client);
	}
}
