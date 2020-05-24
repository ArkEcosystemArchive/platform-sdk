import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

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
