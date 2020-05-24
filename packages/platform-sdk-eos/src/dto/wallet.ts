import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		return this.data.account_name;
	}

	public publicKey(): string | undefined {
		return undefined;
	}

	public balance(): BigNumber {
		return BigNumber.make(this.data.net_weight);
	}

	public nonce(): BigNumber {
		return BigNumber.ZERO;
	}
}
