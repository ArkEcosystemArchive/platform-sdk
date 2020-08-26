import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		return this.data.address;
	}

	public publicKey(): string | undefined {
		return this.data.publicKey;
	}

	public balance(): BigNumber {
		return BigNumber.make(this.data.balance);
	}

	public nonce(): BigNumber {
		return BigNumber.make(this.data.nonce);
	}

	public username(): string | undefined {
		return this.data.username;
	}

	public rank(): number | undefined {
		return this.data.rank;
	}

	public votes(): BigNumber | undefined {
		return BigNumber.make(this.data.votes);
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		if (!this.isMultiSignature()) {
			throw new Error("This wallet does not have a multi-signature registered.");
		}

		return this.data.multiSignature;
	}

	public isDelegate(): boolean {
		return !!this.data.username;
	}

	public isResignedDelegate(): boolean {
		return this.data.isResigned;
	}

	public isKnown(): boolean {
		return false;
	}

	public isMultiSignature(): boolean {
		return !!this.data.multiSignature;
	}

	public isSecondSignature(): boolean {
		return !!this.data.secondPublicKey;
	}
}
