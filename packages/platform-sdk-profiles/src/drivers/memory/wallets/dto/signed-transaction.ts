import { Contracts, DTO } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class SignedTransactionData
	extends DTO.AbstractSignedTransactionData
	implements Contracts.SignedTransactionData {
	/** {@inheritDoc IWalletFactory.generate} */
	public sender(): string {
		return this.signedData.sender;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public recipient(): string {
		return this.signedData.recipient;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public amount(): BigNumber {
		return BigNumber.make(this.signedData.amount);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public fee(): BigNumber {
		return BigNumber.make(this.signedData.fee);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isMultiSignature(): boolean {
		return this.signedData.isMultiSignature;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public isMultiSignatureRegistration(): boolean {
		return this.signedData.isMultiSignatureRegistration;
	}
}
