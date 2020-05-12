import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "address");
	}

	public publicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "publicKey");
	}

	public balance(): Utils.BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "balance");
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.ZERO;
	}
}
