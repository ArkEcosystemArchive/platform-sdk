import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public primaryKey(): string {
		return this.address();
	}

	public address(): string {
		return this.data.address;
	}

	public publicKey(): string | undefined {
		return undefined;
	}

	public balance(): Contracts.WalletBalance {
		// AVAX uses 1e9 instead of the conventional 1e8 so
		// we divide by 1e1 which will normalise it to 1e8 to be
		// consistent for future use by other packages that use it.

		return {
			available: BigNumber.make(this.data.balance / 1e1),
			fees: BigNumber.make(this.data.balance / 1e1),
		};
	}

	public nonce(): BigNumber {
		return BigNumber.ZERO;
	}

	public secondPublicKey(): string | undefined {
		return undefined;
	}

	public username(): string | undefined {
		return undefined;
	}

	public rank(): number | undefined {
		return undefined;
	}

	public votes(): BigNumber | undefined {
		return undefined;
	}

	public entities(): Contracts.Entity[] {
		return [];
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		throw new Error("This wallet does not have a multi-signature registered.");
	}

	public isDelegate(): boolean {
		return false;
	}

	public isResignedDelegate(): boolean {
		return false;
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return false;
	}
}
