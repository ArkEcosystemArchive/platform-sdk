import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		return this.data.address;
	}

	public publicKey(): string | undefined {
		return undefined;
	}

	public balance(): BigNumber {
		return BigNumber.make(this.data.balance);
	}

	public nonce(): BigNumber {
		return BigNumber.make(this.data.nonce);
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
