import { DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class WalletData extends DTO.WalletData {
	public getAddress(): string {
		return this.data.address;
	}

	public getPublicKey(): string | undefined {
		return this.data.publicKey;
	}

	public getBalance(): BigNumber {
		return BigNumber.make(this.data.balance);
	}

	public getNonce(): BigNumber {
		return BigNumber.ZERO;
	}
}
