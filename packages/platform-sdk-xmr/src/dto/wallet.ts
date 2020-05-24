import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "address");
	}

	public publicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "publicKey");
	}

	public balance(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "balance");
	}

	public nonce(): BigNumber {
		return BigNumber.ZERO;
	}
}
