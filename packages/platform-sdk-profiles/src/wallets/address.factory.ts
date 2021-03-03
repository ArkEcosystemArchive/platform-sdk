import { UUID } from "@arkecosystem/platform-sdk-crypto";

import { Address } from "./address";
import { ReadWriteWallet } from "./wallet.models";

export class AddressFactory {
	public static async fromMnemonic(wallet: ReadWriteWallet, options: { mnemonic: string }): Promise<Address> {
		return new Address({
			id: UUID.make(),
			address: await wallet.coin().identity().address().fromMnemonic(options.mnemonic),
			wallet,
		});
	}

	public static async fromAddress(wallet: ReadWriteWallet, options: { address: string }): Promise<Address> {
		return new Address({
			id: UUID.make(),
			address: options.address,
			wallet,
		});
	}

	public static async fromPublicKey(wallet: ReadWriteWallet, options: { publicKey: string }): Promise<Address> {
		return new Address({
			id: UUID.make(),
			address: await wallet.coin().identity().address().fromPublicKey(options.publicKey),
			wallet,
		});
	}

	public static async fromPrivateKey(wallet: ReadWriteWallet, options: { privateKey: string }): Promise<Address> {
		return new Address({
			id: UUID.make(),
			address: await wallet.coin().identity().address().fromPrivateKey(options.privateKey),
			wallet,
		});
	}

	public static async fromMnemonicWithHierarchy(
		wallet: ReadWriteWallet,
		options: { mnemonic: string; account: number; change: number; addressIndex: number },
	): Promise<Address> {
		return new Address({
			id: UUID.make(),
			address: await wallet
				.coin()
				.identity()
				.address()
				.fromMnemonic(options.mnemonic, {
					bip44: { account: options.account, change: options.change, addressIndex: options.addressIndex },
				}),
			wallet,
		});
	}
}
