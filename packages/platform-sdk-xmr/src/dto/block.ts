import { DTO, Exceptions } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class BlockData extends DTO.AbstractBlockData implements Contracts.BlockData {
	public getId(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getId");
	}

	public getHeight(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getHeight");
	}

	public getTimestamp(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTimestamp");
	}

	public getConfirmations(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "getConfirmations");
	}

	public getTransactionsCount(): number {
		throw new Exceptions.NotImplemented(this.constructor.name, "getTransactionsCount");
	}

	public getGenerator(): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getGenerator");
	}

	public getForgedReward(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "getForgedReward");
	}

	public getForgedAmount(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "getForgedAmount");
	}

	public getForgedFee(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "getForgedFee");
	}

	public getForgedTotal(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, "getForgedTotal");
	}
}
