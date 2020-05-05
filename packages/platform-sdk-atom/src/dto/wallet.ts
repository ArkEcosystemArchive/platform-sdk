import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		return this.data.address;
	}

	public publicKey(): string | undefined {
		return this.data.public_key.value;
	}

	public balance(): BigNumber {
		return BigNumber.make(this.data.coins[0].amount.replace(/\D/g, ""));
	}

	public nonce(): BigNumber {
		return BigNumber.make(this.data.sequence);
	}
}
