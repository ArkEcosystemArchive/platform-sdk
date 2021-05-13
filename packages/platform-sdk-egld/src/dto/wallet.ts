import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public primaryKey(): string {
		return this.address();
	}

	public address(): string {
		return this.data.id;
	}

	public publicKey(): string | undefined {
		return undefined;
	}

	public balance(): Contracts.WalletBalance {
		return {
			total: BigNumber.make(this.data.balance).divide(1e18).times(1e8),
			available: BigNumber.make(this.data.balance).divide(1e18).times(1e8),
			fees: BigNumber.make(this.data.balance).divide(1e18).times(1e8),
		};
	}

	public nonce(): BigNumber {
		return BigNumber.make(this.data.nonce);
	}

	public secondPublicKey(): string | undefined {
		return undefined;
	}

	public username(): string | undefined {
		return this.data.username;
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
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
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
