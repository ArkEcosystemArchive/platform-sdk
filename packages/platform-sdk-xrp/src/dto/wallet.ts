import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public getAddress(): string {
		return this.data.account;
	}

	public getPublicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public getBalance(): BigNumber {
		return BigNumber.make(this.data.balance * 1e8);
	}

	public getNonce(): BigNumber {
		return BigNumber.ZERO;
	}
}
