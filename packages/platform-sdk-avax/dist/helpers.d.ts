import { Coins, Services } from "@arkecosystem/platform-sdk";
import { Avalanche, Buffer } from "avalanche";
import { AVMAPI, KeyPair } from "avalanche/dist/apis/avm";
import { InfoAPI } from "avalanche/dist/apis/info";
import { PlatformVMAPI } from "avalanche/dist/apis/platformvm";
export declare const useAvalanche: (config: Coins.ConfigRepository) => Avalanche;
export declare const useInfo: (config: Coins.ConfigRepository) => InfoAPI;
export declare const useXChain: (config: Coins.ConfigRepository) => AVMAPI;
export declare const usePChain: (config: Coins.ConfigRepository) => PlatformVMAPI;
export declare const useKeychain: (config: Coins.ConfigRepository) => import("avalanche/dist/apis/avm").KeyChain;
export declare const cb58Decode: (value: string) => Buffer;
export declare const cb58Encode: (value: Buffer) => string;
export declare const keyPairFromMnemonic: (
	config: Coins.ConfigRepository,
	mnemonic: string,
	options?: Services.IdentityOptions | undefined,
) => {
	child: KeyPair;
	path: string;
};
