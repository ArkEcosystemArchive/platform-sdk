import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { decrypt, encrypt } from "bip38";
import { decode, WIFReturn } from "wif";

import { IReadWriteWallet, WalletData, IWalletImportFormat } from "./contracts";

export class WalletImportFormat implements IWalletImportFormat {
	readonly #wallet: IReadWriteWallet;

	public constructor(wallet: IReadWriteWallet) {
		this.#wallet = wallet;
	}

	/** {@inheritDoc IWalletImportFormat.get} */
	public async get(password: string): Promise<string> {
		const encryptedKey: string | undefined = this.#wallet.data().get(WalletData.Bip38EncryptedKey);

		if (encryptedKey === undefined) {
			throw new Error("This wallet does not use BIP38 encryption.");
		}

		return (
			await this.#wallet
				.coin()
				.wif()
				.fromPrivateKey(decrypt(encryptedKey, password).privateKey.toString("hex"))
		).wif;
	}

	/** {@inheritDoc IWalletImportFormat.set} */
	public async set(value: string, password: string): Promise<void> {
		let wif: string | undefined;

		if (BIP39.validate(value)) {
			wif = (await this.#wallet.coin().wif().fromMnemonic(value)).wif;
		} else {
			wif = (await this.#wallet.coin().wif().fromSecret(value)).wif;
		}

		const { compressed, privateKey } = decode(wif);

		this.#wallet.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, password));

		this.#wallet.profile().status().markAsDirty();
	}

	/** {@inheritDoc IWalletImportFormat.exists} */
	public exists(): boolean {
		return this.#wallet.data().has(WalletData.Bip38EncryptedKey);
	}
}
