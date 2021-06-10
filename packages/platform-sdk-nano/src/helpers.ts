import { wallet } from "nanocurrency-web";

export const deriveAccount = (mnemonic: string, accountIndex = 0) =>
	wallet.fromMnemonic(mnemonic).accounts[accountIndex];

export const deriveLegacyAccount = (mnemonic: string, accountIndex = 0) =>
	wallet.fromLegacyMnemonic(mnemonic).accounts[accountIndex];
