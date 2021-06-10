import { Services } from "@arkecosystem/platform-sdk";
import { IReadWriteWallet } from "../../../contracts";
import { IWalletMutator } from "../../../contracts/wallets/wallet.mutator";
export declare class WalletMutator implements IWalletMutator {
	#private;
	constructor(wallet: IReadWriteWallet);
	/** {@inheritDoc IWalletMutator.coin} */
	coin(
		coin: string,
		network: string,
		options?: {
			sync: boolean;
		},
	): Promise<void>;
	/** {@inheritDoc IWalletMutator.identity} */
	identity(mnemonic: string, options?: Services.IdentityOptions): Promise<void>;
	/** {@inheritDoc IWalletMutator.address} */
	address(
		{ address, path, type }: Partial<Services.AddressDataTransferObject>,
		options?: {
			syncIdentity: boolean;
			validate: boolean;
		},
	): Promise<void>;
	/** {@inheritDoc IWalletMutator.extendedPublicKey} */
	extendedPublicKey(
		publicKey: string,
		options?: {
			syncIdentity: boolean;
			validate: boolean;
		},
	): Promise<void>;
	/** {@inheritDoc IWalletMutator.avatar} */
	avatar(value: string): void;
	/** {@inheritDoc IWalletMutator.alias} */
	alias(alias: string): void;
}
