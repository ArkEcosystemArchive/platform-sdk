import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class WalletData extends DTO.AbstractWalletData implements Contracts.WalletData {
	public address(): string {
		return this.data.address;
	}

	public publicKey(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "publicKey");
	}

	public balance(): BigNumber {
		return BigNumber.make(this.data.balance).times(BigNumber.SATOSHI);
	}

	public nonce(): BigNumber {
		return BigNumber.ZERO;
	}

	public username(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "username");
	}

	public rank(): number | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "rank");
	}

	public votes(): BigNumber | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, "votes");
	}

	public entities(): Contracts.KeyValuePair[] | undefined {
		return [];
	}

	public multiSignature(): Contracts.WalletMultiSignature {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
	}

	public isDelegate(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isDelegate");
	}

	public isResignedDelegate(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isResignedDelegate");
	}

	public isKnown(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isKnown");
	}

	public isMultiSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isMultiSignature");
	}

	public isSecondSignature(): boolean {
		throw new Exceptions.NotImplemented(this.constructor.name, "isSecondSignature");
	}
}
