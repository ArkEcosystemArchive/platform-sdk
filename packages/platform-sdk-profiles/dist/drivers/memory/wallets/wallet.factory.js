"use strict";
/* istanbul ignore file */
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _WalletFactory_instances,
	_WalletFactory_profile,
	_WalletFactory_allowsDeriveWithBIP39,
	_WalletFactory_allowsDeriveWithBIP44,
	_WalletFactory_allowsDeriveWithBIP49,
	_WalletFactory_allowsDeriveWithBIP84,
	_WalletFactory_encryptWallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletFactory = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const bip38_1 = require("bip38");
const uuid_1 = require("uuid");
const wif_1 = require("wif");
const contracts_1 = require("../../../contracts");
const wallet_1 = require("./wallet");
class WalletFactory {
	constructor(profile) {
		_WalletFactory_instances.add(this);
		_WalletFactory_profile.set(this, void 0);
		__classPrivateFieldSet(this, _WalletFactory_profile, profile, "f");
	}
	/** {@inheritDoc IWalletFactory.generate} */
	async generate({ coin, network, locale }) {
		const mnemonic = platform_sdk_crypto_1.BIP39.generate(locale);
		return { mnemonic, wallet: await this.fromMnemonicWithBIP39({ mnemonic, coin, network }) };
	}
	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP39} */
	async fromMnemonicWithBIP39({ coin, network, mnemonic, password }) {
		const wallet = new wallet_1.Wallet(uuid_1.v4(), {}, __classPrivateFieldGet(this, _WalletFactory_profile, "f"));
		wallet.data().set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.BIP39.MNEMONIC);
		await wallet.mutator().coin(coin, network);
		if (wallet.network().usesExtendedPublicKey()) {
			throw new Error("The configured network uses extended public keys with BIP44 for derivation.");
		}
		if (
			!__classPrivateFieldGet(this, _WalletFactory_instances, "m", _WalletFactory_allowsDeriveWithBIP39).call(
				this,
				wallet,
			)
		) {
			throw new Error("The configured network does not support BIP39.");
		}
		await wallet.mutator().identity(mnemonic);
		if (password) {
			wallet
				.data()
				.set(
					contracts_1.WalletData.ImportMethod,
					contracts_1.WalletImportMethod.BIP39.MNEMONIC_WITH_ENCRYPTION,
				);
			await __classPrivateFieldGet(this, _WalletFactory_instances, "m", _WalletFactory_encryptWallet).call(
				this,
				wallet,
				password,
				async () => await wallet.coin().wif().fromMnemonic(mnemonic),
			);
		}
		return wallet;
	}
	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP44} */
	async fromMnemonicWithBIP44({ coin, network, mnemonic }) {
		const wallet = new wallet_1.Wallet(uuid_1.v4(), {}, __classPrivateFieldGet(this, _WalletFactory_profile, "f"));
		wallet.data().set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.BIP44.MNEMONIC);
		await wallet.mutator().coin(coin, network);
		if (
			!__classPrivateFieldGet(this, _WalletFactory_instances, "m", _WalletFactory_allowsDeriveWithBIP44).call(
				this,
				wallet,
			)
		) {
			throw new Error("The configured network does not support BIP44.");
		}
		const { publicKey } = await wallet
			.coin()
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
	async fromMnemonicWithBIP49({ coin, network, mnemonic }) {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.fromMnemonicWithBIP49.name);
	}
	/** {@inheritDoc IWalletFactory.fromMnemonicWithBIP84} */
	async fromMnemonicWithBIP84({ coin, network, mnemonic }) {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.fromMnemonicWithBIP84.name);
	}
	/** {@inheritDoc IWalletFactory.fromAddress} */
	async fromAddress({ coin, network, address }) {
		const wallet = new wallet_1.Wallet(uuid_1.v4(), {}, __classPrivateFieldGet(this, _WalletFactory_profile, "f"));
		wallet.data().set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.Address);
		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address({ address });
		return wallet;
	}
	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	async fromPublicKey({ coin, network, publicKey }) {
		const wallet = new wallet_1.Wallet(uuid_1.v4(), {}, __classPrivateFieldGet(this, _WalletFactory_profile, "f"));
		wallet.data().set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.PublicKey);
		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address(await wallet.coin().address().fromPublicKey(publicKey));
		return wallet;
	}
	/** {@inheritDoc IWalletFactory.fromPrivateKey} */
	async fromPrivateKey({ coin, network, privateKey }) {
		const wallet = new wallet_1.Wallet(uuid_1.v4(), {}, __classPrivateFieldGet(this, _WalletFactory_profile, "f"));
		wallet.data().set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.PrivateKey);
		await wallet.mutator().coin(coin, network);
		await wallet.mutator().address(await wallet.coin().address().fromPrivateKey(privateKey));
		return wallet;
	}
	/** {@inheritDoc IWalletFactory.fromAddressWithDerivationPath} */
	async fromAddressWithDerivationPath({ coin, network, address, path }) {
		const wallet = await this.fromAddress({ coin, network, address });
		if (path.startsWith("m/44")) {
			wallet
				.data()
				.set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.BIP44.DERIVATION_PATH);
		}
		if (path.startsWith("m/49")) {
			wallet
				.data()
				.set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.BIP49.DERIVATION_PATH);
		}
		if (path.startsWith("m/84")) {
			wallet
				.data()
				.set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.BIP84.DERIVATION_PATH);
		}
		wallet.data().set(contracts_1.WalletData.DerivationPath, path);
		return wallet;
	}
	/** {@inheritDoc IWalletFactory.fromWIF} */
	async fromWIF({ coin, network, wif, password }) {
		const wallet = new wallet_1.Wallet(uuid_1.v4(), {}, __classPrivateFieldGet(this, _WalletFactory_profile, "f"));
		await wallet.mutator().coin(coin, network);
		if (password) {
			const { compressed, privateKey } = bip38_1.decrypt(wif, password);
			await wallet.mutator().address(await wallet.coin().address().fromPrivateKey(privateKey.toString("hex")));
			wallet.data().set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.WIFWithEncryption);
			wallet
				.data()
				.set(contracts_1.WalletData.Bip38EncryptedKey, bip38_1.encrypt(privateKey, compressed, password));
		} else {
			wallet.data().set(contracts_1.WalletData.ImportMethod, contracts_1.WalletImportMethod.WIF);
			await wallet.mutator().address(await wallet.coin().address().fromWIF(wif));
		}
		return wallet;
	}
}
exports.WalletFactory = WalletFactory;
(_WalletFactory_profile = new WeakMap()),
	(_WalletFactory_instances = new WeakSet()),
	(_WalletFactory_allowsDeriveWithBIP39 = function _WalletFactory_allowsDeriveWithBIP39(wallet) {
		return wallet.gate().allows(platform_sdk_1.Enums.FeatureFlag.IdentityAddressMnemonicBip39);
	}),
	(_WalletFactory_allowsDeriveWithBIP44 = function _WalletFactory_allowsDeriveWithBIP44(wallet) {
		return wallet.gate().allows(platform_sdk_1.Enums.FeatureFlag.IdentityAddressMnemonicBip44);
	}),
	(_WalletFactory_allowsDeriveWithBIP49 = function _WalletFactory_allowsDeriveWithBIP49(wallet) {
		/* istanbul ignore next */
		return wallet.gate().allows(platform_sdk_1.Enums.FeatureFlag.IdentityAddressMnemonicBip49);
	}),
	(_WalletFactory_allowsDeriveWithBIP84 = function _WalletFactory_allowsDeriveWithBIP84(wallet) {
		/* istanbul ignore next */
		return wallet.gate().allows(platform_sdk_1.Enums.FeatureFlag.IdentityAddressMnemonicBip84);
	}),
	(_WalletFactory_encryptWallet = async function _WalletFactory_encryptWallet(wallet, password, derive) {
		const { compressed, privateKey } = wif_1.decode((await derive()).wif);
		wallet.data().set(contracts_1.WalletData.Bip38EncryptedKey, bip38_1.encrypt(privateKey, compressed, password));
	});
//# sourceMappingURL=wallet.factory.js.map
