import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import { Wallet, Account } from "@zilliqa-js/account";
import { Zilliqa, bytes, units, BN } from "@zilliqa-js/zilliqa";

let zilliqa: Zilliqa | undefined;

export const getZilliqa = (config: Coins.Config) => {
	if (!zilliqa) {
		zilliqa = new Zilliqa(getHost(config));
	}

	return zilliqa;
};

export const getZilliqaVersion = (config: Coins.Config) => {
	const id = config.get<string>("network.id");

	let chainId;
	if (id === "zil.testnet") {
		chainId = 333;
	}

	if (id === "zil.mainnet") {
		chainId = 1;
	}

	if (!chainId) {
		throw new Exceptions.Exception(`Add chainId for network ${id}`);
	}

	return bytes.pack(chainId, 1);
};

export const accountFromMnemonic = async (
	wallet: Wallet,
	mnemonic: string,
	options?: Contracts.IdentityOptions,
): Promise<Account> => {
	const index = options?.bip44?.addressIndex;
	const address = wallet.addByMnemonic(mnemonic, index); // TODO: is second argument correct?
	return wallet.accounts[address];
};

export const accountFromPrivateKey = async (wallet: Wallet, privateKey: string): Promise<Account> => {
	const address = wallet.addByPrivateKey(privateKey);
	return wallet.accounts[address];
};

export const checkGasPrice = (gasPrice: string, minGasPrice = "0") => {
	const isGasSufficient = new BN(gasPrice).gte(new BN(minGasPrice));

	if (!isGasSufficient) {
		throw new Exceptions.Exception(`Insufficient gas: ${gasPrice}, needed: ${minGasPrice}`);
	}
};

export const convertQaToZil = (qa: string): string => units.fromQa(new BN(qa), units.Units.Zil);

export const convertZilToQa = (zil: string | number): string => units.toQa(zil, units.Units.Zil).toString();

const getHost = (config: Coins.Config): string => {
	try {
		return config.get<string>("peer");
	} catch {
		return Arr.randomElement(config.get<string[]>("network.networking.hosts"));
	}
};
