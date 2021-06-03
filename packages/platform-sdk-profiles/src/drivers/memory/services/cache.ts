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

	/** {@inheritDoc ICache.all} */
	public all(): CacheStore {
		return this.#cache.mget(this.keys());
	}

	/** {@inheritDoc ICache.keys} */
	public keys(): string[] {
		return this.#cache.keys();
	}

	/** {@inheritDoc ICache.get} */
	public get<T>(key: string): T {
		const value: T | undefined = this.#cache.get(this.#getCacheKey(key));

		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown cache value.`);
		}

		return value;
	}

	/** {@inheritDoc ICache.set} */
	public set(key: string, value: unknown, ttl: number): void {
		this.#cache.set(this.#getCacheKey(key), value, ttl);
	}

	/** {@inheritDoc ICache.has} */
	public has(key: string): boolean {
		return this.#cache.has(this.#getCacheKey(key));
	}

	/** {@inheritDoc ICache.forget} */
	public forget(key: string): void {
		this.#cache.del(this.#getCacheKey(key));
	}

	/** {@inheritDoc ICache.flush} */
	public flush(): void {
		this.#cache.flushAll();
	}

	#getCacheKey(value: unknown): string {
		return SHA1.digest(Buffer.from(`${this.#prefix}.${JSON.stringify(value)}`, "utf-8")).toString("hex");
	}
}
