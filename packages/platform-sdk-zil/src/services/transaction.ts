import { Contracts, Exceptions, Helpers, IoC, Services } from "@arkecosystem/platform-sdk";
import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BN, Long, units, Zilliqa } from "@zilliqa-js/zilliqa";

import { convertZilToQa, getZilliqaVersion } from "../zilliqa";

@IoC.injectable()
export class TransactionService extends Services.AbstractTransactionService {
	#zilliqa!: Zilliqa;
	#version!: number;

	@IoC.postConstruct()
	private onPostConstruct(): void {
		this.#zilliqa = new Zilliqa(Helpers.randomHostFromConfig(this.configRepository));
		this.#version = getZilliqaVersion(this.configRepository);
	}

	public async transfer(
		input: Services.TransferInput,
		options?: Services.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (!input.data.to) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "data.to");
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

		if (input.signatory.signingKey() === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "signatory");
		}

		const address = this.#zilliqa.wallet.addByMnemonic(input.signatory.signingKey());
		const { publicKey, bech32Address } = this.#zilliqa.wallet.accounts[address];

		if (bech32Address !== input.signatory.address()) {
			throw new Exceptions.Exception(
				`Sender address (${input.signatory.address()}) must match signer address (${bech32Address})`,
			);
		}

		const amount = convertZilToQa(input.data.amount);
		const fee = units.toQa(input.fee, units.Units.Li).toString();
		const signedData = {
			address,
			recipient: input.data.to,
			amount,
			fee,
			timestamp: DateTime.make(),
		};

		const transaction = this.#zilliqa.transactions.new({
			version: this.#version,
			pubKey: publicKey,
			toAddr: input.data.to,
			amount: new BN(convertZilToQa(input.data.amount)),
			gasPrice: new BN(units.toQa(input.fee, units.Units.Li)),
			gasLimit: Long.fromNumber(input.feeLimit),
			data: input.data.memo,
			nonce: new BN(input.nonce).toNumber(),
		});

		const signedTransaction = await this.#zilliqa.wallet.signWith(transaction, address, true);
		const broadcastData = JSON.stringify({ ...signedTransaction.payload, version: this.#version });

		return this.dataTransferObjectService.signedTransaction(signedTransaction.hash, signedData, broadcastData);
	}
}
