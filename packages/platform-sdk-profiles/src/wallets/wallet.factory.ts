import { encrypt } from "bip38";
import { v4 as uuidv4 } from "uuid";
import { decode } from "wif";

import { Profile } from "../profiles/profile";
import { Wallet } from "./wallet";
import { ReadWriteWallet, WalletData } from "./wallet.models";

export class WalletFactory {
	public static async fromMnemonic(
		profile: Profile,
		coin: string,
		network: string,
		mnemonic: string,
	): Promise<ReadWriteWallet> {
		const wallet: ReadWriteWallet = new Wallet(uuidv4(), {}, profile);

		await wallet.setCoin(coin, network);

		if (wallet.derivesWithBIP39()) {
			await wallet.setIdentity(mnemonic);
		}

		if (wallet.derivesWithBIP44()) {
			const addresses = await wallet.coin().identity().addressList().fromMnemonic(mnemonic, 50);

			for (const { spendAddress } of addresses) {
				await wallet.addresses().fromAddress({ address: spendAddress });
			}
		}

		return wallet;
	}

	public static async fromAddress(
		profile: Profile,
		coin: string,
		network: string,
		address: string,
	): Promise<ReadWriteWallet> {
		const wallet: ReadWriteWallet = new Wallet(uuidv4(), {}, profile);

		await wallet.setCoin(coin, network);
		await wallet.setAddress(address);

		return wallet;
	}

	public static async fromPublicKey(
		profile: Profile,
		coin: string,
		network: string,
		publicKey: string,
	): Promise<ReadWriteWallet> {
		const wallet: ReadWriteWallet = new Wallet(uuidv4(), {}, profile);

		await wallet.setCoin(coin, network);
		await wallet.setAddress(await wallet.coin().identity().address().fromPublicKey(publicKey));

		return wallet;
	}

	public static async fromPrivateKey(
		profile: Profile,
		coin: string,
		network: string,
		privateKey: string,
	): Promise<ReadWriteWallet> {
		const wallet: ReadWriteWallet = new Wallet(uuidv4(), {}, profile);

		await wallet.setCoin(coin, network);
		await wallet.setAddress(await wallet.coin().identity().address().fromPrivateKey(privateKey));

		return wallet;
	}

	public static async fromAddressWithLedgerPath(
		profile: Profile,
		coin: string,
		network: string,
		address: string,
		path: string,
	): Promise<ReadWriteWallet> {
		// @TODO: eventually handle the whole process from slip44 path to public key to address

		const wallet: ReadWriteWallet = await this.fromAddress(profile, coin, network, address);

		wallet.data().set(WalletData.LedgerPath, path);

		return wallet;
	}

	public static async fromMnemonicWithEncryption(
		profile: Profile,
		coin: string,
		network: string,
		mnemonic: string,
		password: string,
	): Promise<ReadWriteWallet> {
		const wallet: ReadWriteWallet = await this.fromMnemonic(profile, coin, network, mnemonic);

		const { compressed, privateKey } = decode(await wallet.coin().identity().wif().fromMnemonic(mnemonic));

		wallet.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, password));

		return wallet;
	}
}
