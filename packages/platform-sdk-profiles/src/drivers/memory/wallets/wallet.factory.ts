/* istanbul ignore file */

import { Coins, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { decrypt, encrypt } from "bip38";
import { v4 as uuidv4 } from "uuid";
import { decode } from "wif";
import {
	IAddressOptions,
	IAddressWithDerivationPathOptions,
	IGenerateOptions,
	IMnemonicOptions,
	IPrivateKeyOptions,
	IProfile,
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
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async generate({
		coin,
		network,
		locale,
	}: IGenerateOptions): Promise<{ mnemonic: string; wallet: IReadWriteWallet }> {
		const mnemonic: string = BIP39.generate(locale);

		return { mnemonic, wallet: await this.fromMnemonicWithBIP39({ mnemonic, coin, network }) };
	}

	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP39} */
	public async fromMnemonicWithBIP39({ coin, network, mnemonic, password }: IMnemonicOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {}, this.#profile);

		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.MnemonicBIP39);

		await wallet.mutator().coin(coin, network);

		if (wallet.network().usesExtendedPublicKey()) {
			throw new Error("The configured network uses extended public keys with BIP44 for derivation.");
		}

		if (! this.#allowsDeriveWithBIP39(wallet)) {
			throw new Error("The configured network does not support BIP39.");
		}

		await wallet.mutator().identity(mnemonic);

		if (password) {
			await this.#encryptWallet(
				wallet,
				password,
				async () => await wallet.coin().identity().wif().fromMnemonic(mnemonic),
			);
		}

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP44} */
	public async fromMnemonicWithBIP44({ coin, network, mnemonic }: IMnemonicOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {}, this.#profile);

		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.MnemonicBIP44);

		await wallet.mutator().coin(coin, network);

		if (! this.#allowsDeriveWithBIP44(wallet)) {
			throw new Error("The configured network does not support BIP44.");
		}

		const { publicKey } = await wallet
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
		if (wallet.network().usesExtendedPublicKey()) {
			await wallet.mutator().extendedPublicKey(publicKey);
		} else {
			// @TODO: the address index should be configurable
			await wallet.mutator().identity(mnemonic, { bip44: { account: 0, addressIndex: 0 } });
		}

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP49} */
	public async fromMnemonicWithBIP49({ coin, network, mnemonic }: IMnemonicOptions): Promise<IReadWriteWallet> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromMnemonicWithBIP49.name);
	}

	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP84} */
	public async fromMnemonicWithBIP84({ coin, network, mnemonic }: IMnemonicOptions): Promise<IReadWriteWallet> {
		throw new Exceptions.NotImplemented(this.constructor.name, this.fromMnemonicWithBIP84.name);
	}

	/** {@inheritDoc IWalletFactory.fromAddress} */
	public async fromAddress({ coin, network, address }: IAddressOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {}, this.#profile);
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.Address);

		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address({ address });

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public async fromPublicKey({ coin, network, publicKey }: IPublicKeyOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {}, this.#profile);
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.PublicKey);

		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address(await wallet.coin().identity().address().fromPublicKey(publicKey));

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromPrivateKey} */
	public async fromPrivateKey({ coin, network, privateKey }: IPrivateKeyOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {}, this.#profile);
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.PrivateKey);

		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address(await wallet.coin().identity().address().fromPrivateKey(privateKey));

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromAddressWithDerivationPath} */
	public async fromAddressWithDerivationPath({
		coin,
		network,
		address,
		path,
	}: IAddressWithDerivationPathOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = await this.fromAddress({ coin, network, address });
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.AddressWithDerivationPath);

		wallet.data().set(WalletData.DerivationPath, path);

		return wallet;
	}

	/** {@inheritDoc IWalletFactory.fromWIF} */
	public async fromWIF({ coin, network, wif }: IWifOptions): Promise<IReadWriteWallet> {
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {}, this.#profile);
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
		const wallet: IReadWriteWallet = new Wallet(uuidv4(), {}, this.#profile);
		wallet.data().set(WalletData.ImportMethod, WalletImportMethod.WIFWithEncryption);

		await wallet.mutator().coin(coin, network);

		const { compressed, privateKey } = decrypt(wif, password);

		await wallet
			.mutator()
			.address(await wallet.coin().identity().address().fromPrivateKey(privateKey.toString("hex")));

		wallet.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, password));

		return wallet;
	}

	#allowsDeriveWithBIP39(wallet: IReadWriteWallet): boolean {
		return wallet.gate().allows(Coins.FeatureFlag.IdentityAddressMnemonicBip39);
	}

	#allowsDeriveWithBIP44(wallet: IReadWriteWallet): boolean {
		return wallet.gate().allows(Coins.FeatureFlag.IdentityAddressMnemonicBip44);
	}

	/* istanbul ignore next */
	#allowsDeriveWithBIP49(wallet: IReadWriteWallet): boolean {
		/* istanbul ignore next */
		return wallet.gate().allows(Coins.FeatureFlag.IdentityAddressMnemonicBip49);
	}

	/* istanbul ignore next */
	#allowsDeriveWithBIP84(wallet: IReadWriteWallet): boolean {
		/* istanbul ignore next */
		return wallet.gate().allows(Coins.FeatureFlag.IdentityAddressMnemonicBip84);
	}

	async #encryptWallet(wallet: IReadWriteWallet, password: string, derive: Function): Promise<void> {
		const { compressed, privateKey } = decode((await derive()).wif);

		wallet.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, password));
	}
}
