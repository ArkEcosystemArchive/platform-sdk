import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public getAddress(): string {
		return this.data.account_name;
	}

	public getPublicKey(): string | undefined {
		return undefined;
	}

	public getBalance(): BigNumber {
		return BigNumber.make(this.data.net_weight);
	}

	public getNonce(): BigNumber {
		return BigNumber.ZERO;
	}
}
