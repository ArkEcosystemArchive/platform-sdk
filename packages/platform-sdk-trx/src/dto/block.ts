import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class BlockData extends DTO.AbstractBlockData implements Contracts.BlockData {
	public getId(): string {
		return this.data.blockID;
	}

	public getHeight(): string {
		return this.data.block_header.raw_data.number;
	}

	public getTimestamp(): string {
		return this.data.block_header.raw_data.timestamp;
	}

	public getConfirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public getTransactionsCount(): number {
		const transactions: object[] = this.data.transactions;

		if (!transactions) {
			return 0;
		}

		return transactions.length;
	}

	public getGenerator(): string {
		return this.data.block_header.raw_data.witness_address;
	}

	public getForgedReward(): BigNumber {
		return BigNumber.ZERO;
	}

	public getForgedAmount(): BigNumber {
		return BigNumber.ZERO;
	}

	public getForgedFee(): BigNumber {
		return BigNumber.ZERO;
	}

	public getForgedTotal(): BigNumber {
		return BigNumber.ZERO;
	}
}
