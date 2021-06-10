import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { ICache } from "../../../contracts";
declare type CacheStore = Record<
	string,
	{
		expires_at: DateTime;
		value: unknown;
	}
>;
export declare class Cache implements ICache {
	#private;
	constructor(prefix: string);
	/** {@inheritDoc ICache.all} */
	all(): CacheStore;
	/** {@inheritDoc ICache.keys} */
	keys(): string[];
	/** {@inheritDoc ICache.get} */
	get<T>(key: string): T;
	/** {@inheritDoc ICache.set} */
	set(key: string, value: unknown, ttl: number): void;
	/** {@inheritDoc ICache.has} */
	has(key: string): boolean;
	/** {@inheritDoc ICache.forget} */
	forget(key: string): void;
	/** {@inheritDoc ICache.flush} */
	flush(): void;
}
export {};
