import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public override primaryKey(): string {
		return this.address();
	}

	public override address(): string {
		return this.data.address;
	}

	public override publicKey(): string | undefined {
		return undefined;
	}

	public override balance(): Contracts.WalletBalance {
		// AVAX uses 1e9 instead of the conventional 1e8 so
		// we divide by 1e1 which will normalise it to 1e8 to be
		// consistent for future use by other packages that use it.

		return {
			available: this.bigNumberService.make((this.data.balance / 1e1),
			fees: this.bigNumberService.make(this.data.balance / 1e1),
		};
	}

	public override nonce(): BigNumber {
		return BigNumber.ZERO;
	}

	public override secondPublicKey(): string | undefined {
		return undefined;
	}

	public override username(): string | undefined {
		return undefined;
	}

	public override rank(): number | undefined {
		return undefined;
	}

	public override votes(): BigNumber | undefined {
		return undefined;
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		throw new Error("This wallet does not have a multi-signature registered.");
	}

	public override isDelegate(): boolean {
		return false;
	}

	public override isResignedDelegate(): boolean {
		return false;
	}

	public override isMultiSignature(): boolean {
		return false;
	}

	public override isSecondSignature(): boolean {
		return false;
	}
}
