import { DateTime } from "@arkecosystem/platform-sdk-intl";

type CacheStore = Record<string, { expires_at: DateTime; value: unknown }>;

export interface ICache {
	all(): CacheStore;
	keys(): string[];
	get<T>(key: string): T;
	set(key: string, value: unknown, ttl: number): void;
	has(key: string): boolean;
	forget(key: string): void;
	flush(): void;
}
