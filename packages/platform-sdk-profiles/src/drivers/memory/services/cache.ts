import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { SHA1 } from "bcrypto";
import NodeCache from "node-cache";
import { ICache } from "../../../contracts";

type CacheStore = Record<string, { expires_at: DateTime; value: unknown }>;

export class Cache implements ICache {
	readonly #prefix: string;
	readonly #cache: NodeCache = new NodeCache();

	public constructor(prefix: string) {
		this.#prefix = prefix;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public all(): CacheStore {
		return this.#cache.mget(this.keys());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public keys(): string[] {
		return this.#cache.keys();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public get<T>(key: string): T {
		const value: T | undefined = this.#cache.get(this.getCacheKey(key));

		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown cache value.`);
		}

		return value;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public set(key: string, value: unknown, ttl: number): void {
		this.#cache.set(this.getCacheKey(key), value, ttl);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public has(key: string): boolean {
		return this.#cache.has(this.getCacheKey(key));
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public forget(key: string): void {
		this.#cache.del(this.getCacheKey(key));
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public flush(): void {
		this.#cache.flushAll();
	}

	private getCacheKey(value: unknown): string {
		return SHA1.digest(Buffer.from(`${this.#prefix}.${JSON.stringify(value)}`, "utf-8")).toString("hex");
	}
}
