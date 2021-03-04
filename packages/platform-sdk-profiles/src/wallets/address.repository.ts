import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Address } from "./address";
import { AddressFactory } from "./address.factory";
import { ReadWriteWallet } from "./wallet.models";

export class AddressRepository {
	readonly #storage: Set<Address> = new Set<Address>();
	readonly #wallet: ReadWriteWallet;

	public constructor(wallet: ReadWriteWallet) {
		this.#wallet = wallet;
	}

	public all(): Address[] {
		return [...this.#storage.values()];
	}

	public balance(): BigNumber {
		return [...this.#storage.values()].reduce(
			(accumulator: BigNumber, address: Address) => accumulator.plus(address.balance()),
			BigNumber.ZERO,
		);
	}

	public async fromMnemonic(options: { mnemonic: string }): Promise<Address> {
		return AddressFactory.fromMnemonic(this.#wallet, options);
	}

	public async fromAddress(options: { address: string }): Promise<Address> {
		return AddressFactory.fromAddress(this.#wallet, options);
	}

	public async fromPublicKey(options: { publicKey: string }): Promise<Address> {
		return AddressFactory.fromPublicKey(this.#wallet, options);
	}

	public async fromPrivateKey(options: { privateKey: string }): Promise<Address> {
		return AddressFactory.fromPrivateKey(this.#wallet, options);
	}

	public async fromMnemonicWithHierarchy(options: {
		mnemonic: string;
		account: number;
		change: number;
		addressIndex: number;
	}): Promise<Address> {
		return AddressFactory.fromMnemonicWithHierarchy(this.#wallet, options);
	}
}
