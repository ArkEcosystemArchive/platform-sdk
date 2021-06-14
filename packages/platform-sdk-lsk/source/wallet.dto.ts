import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public primaryKey(): string {
		return this.address();
	}

	public address(): string {
		return this.data.address || this.data.account?.address;
	}

	public publicKey(): string {
		return this.data.publicKey || this.data.account?.publicKey;
	}

	public balance(): Contracts.WalletBalance {
		return {
			available: BigNumber.make(this.data.balance),
			fees: BigNumber.make(this.data.balance),
		};
	}

	public nonce(): BigNumber {
		return BigNumber.ZERO;
	}

	public secondPublicKey(): string | undefined {
		return this.data.secondPublicKey;
	}

	public username(): string | undefined {
		return this.data.username || this.data.delegate?.username;
	}

	public rank(): number | undefined {
		return this.data.rank || this.data.delegate?.rank;
	}

	public votes(): BigNumber | undefined {
		return BigNumber.make(this.data.vote || this.data.delegate?.vote);
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		if (!this.isMultiSignatureRegistration()) {
			throw new Error("This wallet does not have a multi-signature registered.");
		}

		return this.data.multiSignature;
	}

	public isDelegate(): boolean {
		return !!this.data.delegate;
	}

	public isResignedDelegate(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return !!this.data.secondPublicKey;
	}
}
