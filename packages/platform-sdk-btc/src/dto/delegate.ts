import { Contracts, DTO, Exceptions } from "@arkecosystem/platform-sdk";

export class DelegateData extends DTO.AbstractDelegateData implements Contracts.DelegateData {
	public address(): string {
		return this.data.address;
	}

	public publicKey(): string {
		return this.data.publicKey;
	}

	public username(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "username");
	}

	public rank(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "rank");
	}
}
