import { Contracts, DTO, Exceptions, IoC } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.id;
	}

	public override blockId(): string | undefined {
		throw new Exceptions.NotImplemented(this.constructor.name, this.blockId.name);
	}

	public override timestamp(): DateTime {
		throw new Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}

	public override confirmations(): BigNumber {
		throw new Exceptions.NotImplemented(this.constructor.name, this.confirmations.name);
	}

	public override sender(): string {
		return this.data.sender;
	}

	public override recipient(): string {
		return this.data.recipient;
	}

	public override recipients(): Contracts.MultiPaymentRecipient[] {
		return [{ address: this.recipient(), amount: this.amount() }];
	}

	public override inputs(): Contracts.UnspentTransactionData[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.inputs.name);
	}

	public override outputs(): Contracts.UnspentTransactionData[] {
		throw new Exceptions.NotImplemented(this.constructor.name, this.outputs.name);
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(this.data.amount);
	}

	public override fee(): BigNumber {
		return BigNumber.make(this.data.gasUsed).times(this.data.gasPrice);
	}

	public override isConfirmed(): boolean {
		return this.data.isConfirmed;
	}

	public override isSent(): boolean {
		return this.data.isSent;
	}
}
