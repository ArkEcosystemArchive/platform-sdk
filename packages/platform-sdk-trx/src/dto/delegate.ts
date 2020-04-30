import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";

export class DelegateData extends DTO.AbstractDelegateData implements Contracts.DelegateData {
	public getAddress(): string {
		return this.data.address;
	}

	public getPublicKey(): string {
		return this.data.publicKey;
	}

	public getUsername(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getUsername");
	}

	public getRank(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "getRank");
	}
}
