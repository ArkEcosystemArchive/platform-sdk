import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import {
	Address,
	Balance,
	GasLimit,
	GasPrice,
	Mnemonic,
	Nonce,
	Transaction,
	TransactionPayload,
	UserSigner,
} from "@elrondnetwork/erdjs";

export class TransactionService extends Services.AbstractTransactionService {
	public override async transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData> {
		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "sign.mnemonic");
		}

		if (input.fee === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "fee");
		}

		if (input.feeLimit === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "feeLimit");
		}

		if (input.nonce === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "nonce");
		}

		const unsignedTransaction = {
			sender: input.signatory.address(),
			receiver: input.data.to,
			value: input.data.amount,
			gasPrice: input.fee as unknown as number,
			gasLimit: input.feeLimit as unknown as number,
			data: input.data.memo,
			timestamp: DateTime.make(),
		};

		const mnemonic = Mnemonic.fromString(input.signatory.signingKey());
		const secretKey = mnemonic.deriveKey(0); // TODO probably need to consider account index for all bip44 wallets
		const signer = new UserSigner(secretKey);

		const transaction = new Transaction({
			receiver: Address.fromString(input.data.to),
			value: Balance.egld(input.data.amount),
			gasPrice: new GasPrice(input.fee as unknown as number),
			gasLimit: new GasLimit(input.feeLimit as unknown as number),
			data: new TransactionPayload(input.data.memo),
			nonce: new Nonce(parseInt(input.nonce)),
		});
		await signer.sign(transaction);

		return this.dataTransferObjectService.signedTransaction(
			transaction.getSignature().hex(),
			unsignedTransaction,
			transaction,
		);
	}
}
