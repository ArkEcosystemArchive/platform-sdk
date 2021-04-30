import { Coins } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { decrypt, encrypt } from "bip38";
import { v4 as uuidv4 } from "uuid";
import { decode } from "wif";
import {
	IAddressOptions,
	IAddressWithLedgerPathOptions,
	IGenerateOptions,
	IMnemonicOptions,
	IMnemonicWithEncryptionOptions,
	IPrivateKeyOptions,
	IPublicKeyOptions,
	IReadWriteWallet,
	IWalletFactory,
	IWifOptions,
	IWifWithEncryptionOptions,
	WalletData,
	WalletImportMethod,
} from "../../../contracts";

import { Wallet } from "./wallet";

export class WalletFactory implements IWalletFactory {
	/** {@inheritDoc IWalletFactory.generate} */
	public async generate({
		coin,
		network,
		locale,
	}: IGenerateOptions): Promise<{ mnemonic: string; wallet: IReadWriteWallet }> {
		const mnemonic: string = BIP39.generate(locale);

		return { mnemonic, wallet: await this.fromMnemonic({ mnemonic, coin, network }) };
	}

	/** {@inheritDoc IWalletFactory.fromMnemonic} */
	public async fromMnemonic({
		coin,
		network,
		mnemonic,
		useBIP39 = true,
		useBIP44 = false,
	}: IMnemonicOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.Mnemonic);

		await wallet.mutator().coin(coin, network);

		if (useBIP39 && wallet.network().usesExtendedPublicKey()) {
			throw new Error("The configured network uses extended public keys for derivation. Please pass in BIP44 arguments.");
		}

		if (useBIP39 && this.allowsDeriveWithBIP39(wallet)) {
			await wallet.mutator().identity(mnemonic);
		}

		if (useBIP44 && this.allowsDeriveWithBIP44(wallet)) {
			const publicKey: string = await wallet
				.coin()
				.identity()
				.publicKey()
				// @TODO: the account index should be configurable
				.fromMnemonic(mnemonic, { bip44: { account: 0 } });

			/**
			 * @remarks
			 * Coins like ADA use extended public keys for the wallets derivation
			 *
			 * This means that we need to use the EPK internally and let the coin
			 * implementation handle the derivation of addresses for transactions
			 * listing and UTXO collection. This is important so that the clients
			 * don't have to deal with any coin specifics and guarantees that the
			 * coin is in full control of the wanted behaviours and insurances it
			 * needs to guarantee the specification conform derivation of wallets
			 */
			if(wallet.network().usesExtendedPublicKey()) {
				await wallet.mutator().extendedPublicKey(publicKey);
			} else {
				await wallet.mutator().address(
					// @TODO: the address index should be configurable
					await wallet.identity().address().fromMnemonic(mnemonic, { bip44: { account: 0, addressIndex: 0 } }),
				);
			}
		}

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromAddress} */
	public async fromAddress({ coin, network, address }: IAddressOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.Address);

		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address(address);

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public async fromPublicKey({ coin, network, publicKey }: IPublicKeyOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.PublicKey);

		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address(await wallet.coin().identity().address().fromPublicKey(publicKey));

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromPrivateKey} */
	public async fromPrivateKey({ coin, network, privateKey }: IPrivateKeyOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.PrivateKey);

		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address(await wallet.coin().identity().address().fromPrivateKey(privateKey));

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromAddressWithLedgerPath} */
	public async fromAddressWithLedgerPath({
		coin,
		network,
		address,
		path,
	}: IAddressWithLedgerPathOptions): Promise<IReadWriteWallet> {
		// @TODO: eventually handle the whole process from slip44 path to public key to address

		const wallet: IReadWriteWallet = await this.fromAddress({ coin, network, address });
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.AddressWithLedgerPath);

		wallet.data().set(WalletData.LedgerPath, path);

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromMnemonicWithEncryption} */
	public async fromMnemonicWithEncryption({
		coin,
		network,
		mnemonic,
		password,
	}: IMnemonicWithEncryptionOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = await this.fromMnemonic({ coin, network, mnemonic });
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.MnemonicWithEncryption);

		const { compressed, privateKey } = decode(await wallet.coin().identity().wif().fromMnemonic(mnemonic));

		wallet.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, password));

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromWIF} */
	public async fromWIF({ coin, network, wif }: IWifOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.WIF);

		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address(await wallet.coin().identity().address().fromWIF(wif));

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromWIFWithEncryption} */
	public async fromWIFWithEncryption({
		coin,
		network,
		wif,
		password,
	}: IWifWithEncryptionOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {});
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.WIFWithEncryption);

		await wallet.mutator().coin(coin, network);

		const { compressed, privateKey } = decrypt(wif, password);

		await wallet
			.mutator()
			.address(await wallet.coin().identity().address().fromPrivateKey(privateKey.toString("hex")));

		wallet.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, password));

		return wallet;
	}

	private allowsDeriveWithBIP39(wallet: IReadWriteWallet): boolean {
		return wallet.gate().allows(Coins.FeatureFlag.DerivationBIP39);
	}

	private allowsDeriveWithBIP44(wallet: IReadWriteWallet): boolean {
		return wallet.gate().allows(Coins.FeatureFlag.DerivationBIP44);
	}
}
