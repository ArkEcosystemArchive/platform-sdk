import { DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/utils";

export class BlockData extends DTO.BlockData {
	public getId(): string {
		return this.data.hash;
		// return this.data.blockID;
	}

	public getHeight(): string {
		return this.data.height;
		// return this.data.block_header.raw_data.number;
	}

	public getTimestamp(): string {
		return this.data.time;
		// return this.data.block_header.raw_data.timestamp;
	}

	public getConfirmations(): BigNumber {
		return BigNumber.ZERO;
	}

	public getTransactionsCount(): number {
		return 0;
	}

	public getGenerator(): string {
		return "";
		// return this.data.block_header.raw_data.witness_address;
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
