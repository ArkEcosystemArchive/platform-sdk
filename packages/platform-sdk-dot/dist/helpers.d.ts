import { Coins } from "@arkecosystem/platform-sdk";
import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
export declare const createApiPromise: (config: Coins.ConfigRepository) => Promise<ApiPromise>;
export declare const createKeyring: (config: Coins.ConfigRepository) => Keyring;
