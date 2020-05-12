import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		return this.data.account;
	}

	public publicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "publicKey");
	}

	public balance(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.balance * 1e8);
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.ZERO;
	}
}
