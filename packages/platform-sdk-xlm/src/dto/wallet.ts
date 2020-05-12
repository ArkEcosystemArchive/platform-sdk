import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { Utils } from "@arkecosystem/platform-sdk";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		return this.data.id;
	}

	public publicKey(): string {
		return this.data.id;
	}

	public balance(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.balances[0].balance * 1e8);
	}

	public nonce(): Utils.BigNumber {
		return Utils.BigNumber.make(this.data.sequence);
	}
}
