import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		return this.data.account_name;
	}

	public publicKey(): string | undefined {
		return undefined;
	}

	public balance(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.net_weight);
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.ZERO;
	}
}
