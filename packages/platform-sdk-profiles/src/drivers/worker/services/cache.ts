import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { SHA1 } from "bcrypto";
import NodeCache from "node-cache";
import { ICache } from "../../../contracts";

type CacheStore = Record<string, { expires_at: DateTime; value: unknown }>;

export class Cache implements ICache {
	//
}
