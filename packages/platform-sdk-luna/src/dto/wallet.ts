import { Contracts, DTO, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public primaryKey(): string {
		return this.address();
	}

	public address(): string {
		return "TODO";
	}

	public publicKey(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.publicKey.name);
	}

	public balance(): Contracts.WalletBalance {
		return {
			available: BigNumber.ZERO,
			fees: BigNumber.ZERO,
		};
	}

	public nonce(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.nonce.name);
	}

	public secondPublicKey(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}

	public username(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.username.name);
	}

	public rank(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.rank.name);
	}

	public votes(): BigNumber | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.votes.name);
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

	public isMultiSignature(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return false;
	}
}
