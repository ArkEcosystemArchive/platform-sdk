import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public override primaryKey(): string {
		return this.address();
	}

	public override address(): string {
		return this.data.address || this.data.account?.address;
	}

	public override publicKey(): string {
		return this.data.publicKey || this.data.account?.publicKey;
	}

	public override balance(): Contracts.WalletBalance {
		return {
			available: this.bigNumberService.make(this.data.balance),
			fees: this.bigNumberService.make(this.data.balance),
		};
	}

	public override nonce(): BigNumber {
		return BigNumber.ZERO;
	}

	public override secondPublicKey(): string | undefined {
		return this.data.secondPublicKey;
	}

	public override username(): string | undefined {
		return this.data.username || this.data.delegate?.username;
	}

	public override rank(): number | undefined {
		return this.data.rank || this.data.delegate?.rank;
	}

	public override votes(): BigNumber | undefined {
		return BigNumber.make(this.data.vote || this.data.delegate?.vote);
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		if (!this.isMultiSignature()) {
			throw new Error("This wallet does not have a multi-signature registered.");
		}

		return this.data.multiSignature;
	}

	public override isDelegate(): boolean {
		return !!this.data.delegate;
	}

	public override isResignedDelegate(): boolean {
		return false;
	}

	public override isMultiSignature(): boolean {
		return false;
	}

	public override isSecondSignature(): boolean {
		return !!this.data.secondPublicKey;
	}
}
