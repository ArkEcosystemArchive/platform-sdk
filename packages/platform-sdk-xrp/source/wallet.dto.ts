import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public primaryKey(): string {
		return this.address();
	}

	public address(): string {
		return this.data.Account;
	}

	public publicKey(): string | undefined {
		return undefined;
	}

	public balance(): Contracts.WalletBalance {
		return {
			available: BigNumber.make(this.data.Balance).times(1e8),
			fees: BigNumber.make(this.data.Balance).times(1e8),
		};
	}

	public nonce(): BigNumber {
		return BigNumber.make(this.data.Sequence);
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

	public multiSignature(): Contracts.WalletMultiSignature {
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	public isDelegate(): boolean {
		return false;
	}

	public isResignedDelegate(): boolean {
		return false;
	}

	public isMultiSignatureRegistration(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return false;
	}
}
