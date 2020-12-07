import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { SHA1 } from "bcrypto";
import dot from "dot-prop";

type CacheStore = Record<string, { expires_at: DateTime; value: unknown }>;

export class Cache {
	readonly #prefix: string;
	#cache: CacheStore = {};

	public constructor(prefix: string) {
		this.#prefix = prefix;
	}

	public all(): CacheStore {
		return this.#cache;
	}

	public keys(): string[] {
		return Object.keys(this.#cache);
	}

	public get<T>(key: string): T {
		const value: T | undefined = dot.get(this.#cache, this.getCacheKey(key));

		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown cache value.`);
		}

		return value;
	}

	public set(key: string, value: unknown, ttl: number): void {
		dot.set(this.#cache, this.getCacheKey(key), {
			expires_at: DateTime.make().addSeconds(ttl),
			value,
		});

		// @TODO
		// this.checkExpiration(ttl);
	}

	public has(key: string): boolean {
		return dot.has(this.#cache, this.getCacheKey(key));
	}

	public forget(key: string): void {
		dot.delete(this.#cache, this.getCacheKey(key));
	}

	public flush(): void {
		this.#cache = {};
	}

	private getCacheKey(value: unknown): string {
		return SHA1.digest(Buffer.from(`${this.#prefix}.${JSON.stringify(value)}`, "utf-8")).toString("hex");
	}

	// @TODO
	// private checkExpiration = (ttl: number) => {
	// 	for (const [key, value] of Object.entries(this.all())) {
	// 		if (value.expires_at.isBefore(DateTime.make())) {
	// 			this.forget(key);
	// 		}
	// 	}

	// 	setTimeout(this.checkExpiration, ttl * 1000, true);
	// }
}
