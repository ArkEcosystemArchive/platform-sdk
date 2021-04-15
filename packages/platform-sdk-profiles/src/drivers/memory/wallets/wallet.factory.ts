import { Coins } from "@arkecosystem/platform-sdk";
import { decrypt, encrypt } from "bip38";
import { v4 as uuidv4 } from "uuid";
import { decode } from "wif";
import { IProfile, IReadWriteWallet, IWalletFactory, WalletData } from "../../../contracts";

import { Wallet } from "./wallet";

export class WalletFactory implements IWalletFactory {
	public async fromMnemonic({
		coin,
		network,
		mnemonic,
		useBIP39 = true,
		useBIP44 = false,
	}: {
		coin: string;
		network: string;
		mnemonic: string;
		useBIP39?: boolean;
		useBIP44?: boolean;
	}): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});

		await wallet.setCoin(coin, network);

		if (useBIP39 && this.canDeriveWithBIP39(wallet)) {
			await wallet.setIdentity(mnemonic);
		}

		if (useBIP44 && this.canDeriveWithBIP44(wallet)) {
			await wallet.setAddress(
				await wallet
					.coin()
					.identity()
					.publicKey()
					// @ts-ignore - We currently require all bip44 parameters to be specified but only need the account index to derive the account public key
					.fromMnemonic(mnemonic, { bip44: { account: 0 } }),
			);
		}

		return wallet;
	}

	public async fromAddress({
		coin,
		network,
		address,
	}: {
		coin: string;
		network: string;
		address: string;
	}): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});

		await wallet.setCoin(coin, network);
		await wallet.setAddress(address);

		return wallet;
	}

	public async fromPublicKey({
		coin,
		network,
		publicKey,
	}: {
		coin: string;
		network: string;
		publicKey: string;
	}): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});

		await wallet.setCoin(coin, network);
		await wallet.setAddress(await wallet.coin().identity().address().fromPublicKey(publicKey));

		return wallet;
	}

	public async fromPrivateKey({
		coin,
		network,
		privateKey,
	}: {
		coin: string;
		network: string;
		privateKey: string;
	}): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});

		await wallet.setCoin(coin, network);
		await wallet.setAddress(await wallet.coin().identity().address().fromPrivateKey(privateKey));

		return wallet;
	}

	public async fromAddressWithLedgerPath({
		coin,
		network,
		address,
		path,
	}: {
		coin: string;
		network: string;
		address: string;
		path: string;
	}): Promise<IReadWriteWallet> {
		// @TODO: eventually handle the whole process from slip44 path to public key to address

		const wallet: IReadWriteWallet = await this.fromAddress({ coin, network, address });

		wallet.data().set(WalletData.LedgerPath, path);

		return wallet;
	}

	public async fromMnemonicWithEncryption({
		coin,
		network,
		mnemonic,
		password,
	}: {
		coin: string;
		network: string;
		mnemonic: string;
		password: string;
	}): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = await this.fromMnemonic({ coin, network, mnemonic });

		const { compressed, privateKey } = decode(await wallet.coin().identity().wif().fromMnemonic(mnemonic));

		wallet.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, password));

		return wallet;
	}

	public async fromWIF({
		coin,
		network,
		wif,
	}: {
		coin: string;
		network: string;
		wif: string;
	}): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});

		await wallet.setCoin(coin, network);
		await wallet.setAddress(await wallet.coin().identity().address().fromWIF(wif));

		return wallet;
	}

	public async fromWIFWithEncryption({
		coin,
		network,
		wif,
		password,
	}: {
		coin: string;
		network: string;
		wif: string;
		password: string;
	}): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});

		await wallet.setCoin(coin, network);

		const { compressed, privateKey } = decrypt(wif, password);

		await wallet.setAddress(await wallet.coin().identity().address().fromPrivateKey(privateKey.toString("hex")));

		wallet.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, password));

		return wallet;
	}

	private canDeriveWithBIP39(wallet: IReadWriteWallet): boolean {
		return wallet.can(Coins.FeatureFlag.DerivationBIP39);
	}

	private canDeriveWithBIP44(wallet: IReadWriteWallet): boolean {
		return wallet.can(Coins.FeatureFlag.DerivationBIP44);
	}
}
