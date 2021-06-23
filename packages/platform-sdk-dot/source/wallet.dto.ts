import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
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
		return {
			available: this.bigNumberService.make((this.data.balance),
			fees: this.bigNumberService.make(this.data.balance),
		};
	}

	public override nonce(): BigNumber {
		return BigNumber.make(this.data.nonce);
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
		throw new Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
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
