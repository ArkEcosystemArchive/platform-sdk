import { DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public getAddress(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getAddress");
	}

	public getPublicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public getBalance(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "getBalance");
	}

	public getNonce(): BigNumber {
		return BigNumber.ZERO;
	}
}
