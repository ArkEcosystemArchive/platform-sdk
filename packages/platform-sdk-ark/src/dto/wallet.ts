import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		return this.data.address;
	}

	public publicKey(): string | undefined {
		return this.data.publicKey;
	}

	public balance(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.balance);
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.nonce);
	}
}
