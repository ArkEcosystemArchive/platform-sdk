import { Coins, Contracts, Helpers } from "@arkecosystem/platform-sdk";
import { BIP39, BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { Avalanche, BinTools, Buffer } from "avalanche";
import { AVMAPI, KeyPair } from "avalanche/dist/apis/avm";
import { InfoAPI } from "avalanche/dist/apis/info";
import { PlatformVMAPI } from "avalanche/dist/apis/platformvm";
import HDKey from "hdkey";
import urlParseLax from "url-parse-lax";

export const useAvalanche = (config: Coins.Config): Avalanche => {
	const { hostname: host, port, protocol } = urlParseLax(Helpers.randomHostFromConfig(config));

	return new Avalanche(
		host,
		port,
		protocol.replace(":", ""),
		parseInt(config.get("network.meta.networkId")),
		config.get("network.meta.blockchainId"),
	);
};

export const useInfo = (config: Coins.Config): InfoAPI => useAvalanche(config).Info();

export const useXChain = (config: Coins.Config): AVMAPI => useAvalanche(config).XChain();

export const usePChain = (config: Coins.Config): PlatformVMAPI => useAvalanche(config).PChain();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useKeychain = (config: Coins.Config) => useXChain(config).keyChain();

export const cb58Decode = (value: string): Buffer => BinTools.getInstance().cb58Decode(value);

export const cb58Encode = (value: Buffer): string => BinTools.getInstance().cb58Encode(value);

// Crypto
export const keyPairFromMnemonic = (
	config: Coins.Config,
	mnemonic: string,
	options?: Contracts.IdentityOptions,
): { child: KeyPair; path: string } => {
	const path = BIP44.stringify({
		coinType: config.get(Coins.ConfigKey.Slip44),
		account: options?.bip44?.account,
		index: options?.bip44?.addressIndex,
	});

	return {
		child: useKeychain(config).importKey(
			// @ts-ignore
			HDKey.fromMasterSeed(BIP39.toSeed(mnemonic)).derive(path).privateKey,
		),
		path,
	};
};
