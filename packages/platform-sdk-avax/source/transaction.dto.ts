import { Contracts, DTO, IoC } from "@arkecosystem/platform-sdk";
import { Base64 } from "@arkecosystem/platform-sdk-crypto";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

@IoC.injectable()
export class ConfirmedTransactionData extends DTO.AbstractConfirmedTransactionData {
	public override id(): string {
		return this.data.id;
	}

	public override blockId(): string | undefined {
		return undefined;
	}

	public override timestamp(): DateTime | undefined {
		return DateTime.make(this.data.timestamp);
	}

	public override confirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public override sender(): string {
		return Object.keys(this.data.inputTotals)[0];
	}

	public override recipient(): string {
		return Object.keys(this.data.outputTotals)[0];
	}

	public override amount(): BigNumber {
		return this.bigNumberService.make(Object.values(this.data.outputTotals)[0] as string);
	}

	public override fee(): BigNumber {
		return this.bigNumberService.make(this.data.txFee);
	}

	public override inputs(): Contracts.UnspentTransactionData[] {
		return this.data.inputs.map(
			(input: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					id: input.transactionID,
					timestamp: DateTime.make(input.timestamp),
					amount: this.bigNumberService.make(input.amount),
					addresses: input.addresses,
				}),
		);
	}

	public override outputs(): Contracts.UnspentTransactionData[] {
		return this.data.outputs.map(
			(output: Contracts.KeyValuePair) =>
				new DTO.UnspentTransactionData({
					id: output.transactionID,
					timestamp: DateTime.make(output.timestamp),
					amount: this.bigNumberService.make(output.amount),
					addresses: output.addresses,
				}),
		);
	}

	public override isConfirmed(): boolean {
		return true;
	}

	public override isTransfer(): boolean {
		return this.data.type === "base";
	}

	public override memo(): string | undefined {
		try {
			return Base64.decode(this.data.memo);
		} catch {
			return undefined;
		}
	}
}
