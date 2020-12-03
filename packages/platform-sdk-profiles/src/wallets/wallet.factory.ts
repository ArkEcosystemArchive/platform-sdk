import { v4 as uuidv4 } from "uuid";

import { Profile } from "../profiles/profile";
import { Wallet } from "./wallet";
import { ReadWriteWallet, WalletFlag } from "./wallet.models";

export class WalletFactory {
	public static async fromMnemonic(
		profile: Profile,
		coin: string,
		network: string,
		mnemonic: string,
	): Promise<ReadWriteWallet> {
		const wallet: ReadWriteWallet = new Wallet(uuidv4(), profile);

		await wallet.setCoin(coin, network);
		await wallet.setIdentity(mnemonic);

		return wallet;
	}

	public static async fromAddress(
		profile: Profile,
		coin: string,
		network: string,
		address: string,
	): Promise<ReadWriteWallet> {
		const wallet: ReadWriteWallet = new Wallet(uuidv4(), profile);

		await wallet.setCoin(coin, network);
		await wallet.setAddress(address);

		return wallet;
	}

	public static async fromAddressWithLedgerIndex(
		profile: Profile,
		coin: string,
		network: string,
		address: string,
		index: string,
	): Promise<ReadWriteWallet> {
		// @TODO: eventually handle the whole process from slip44 path to public key to address

		const wallet: ReadWriteWallet = await this.fromAddress(profile, address, coin, network);

		wallet.data().set(WalletFlag.LedgerIndex, index);

		return wallet;
	}
}
