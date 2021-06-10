import { Coins, Services } from "@arkecosystem/platform-sdk";
import { Wallet, Account } from "@zilliqa-js/account";
export declare const getZilliqaVersion: (config: Coins.ConfigRepository) => number;
export declare const accountFromMnemonic: (
	wallet: Wallet,
	mnemonic: string,
	options?: Services.IdentityOptions | undefined,
) => Promise<Account>;
export declare const accountFromPrivateKey: (wallet: Wallet, privateKey: string) => Promise<Account>;
export declare const convertQaToZil: (qa: string) => string;
export declare const convertZilToQa: (zil: string | number) => string;
