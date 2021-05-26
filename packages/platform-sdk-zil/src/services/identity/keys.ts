import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";
import { accountFromMnemonic, accountFromPrivateKey } from "../../zilliqa";

export class KeyPairService implements Contracts.KeyPairService {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		this.#wallet = wallet;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		const { publicKey, privateKey } = await accountFromMnemonic(this.#wallet, mnemonic, options);

		return { publicKey, privateKey };
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		const { publicKey } = await accountFromPrivateKey(this.#wallet, privateKey);

		return { publicKey, privateKey };
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.KeyPairDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
