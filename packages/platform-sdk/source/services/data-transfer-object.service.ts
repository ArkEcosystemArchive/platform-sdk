/* istanbul ignore file */

import { get } from "dot-prop";

import { ConfigKey, ConfigRepository } from "../coins";
import { TransactionDataCollection } from "../collections";
import { TransactionDataType, WalletData } from "../contracts";
import * as DataTransferObjects from "../dto";
import { SignedTransactionData } from "../dto/signed-transaction.contract";
import { TransactionData } from "../dto/transaction.contract";
import { Container, inject, injectable } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import { MetaPagination } from "./client.contract";
import { DataTransferObjectService } from "./data-transfer-object.contract";

@injectable()
export class AbstractDataTransferObjectService implements DataTransferObjectService {
	// @TODO: rework so that the container is not needed, this is a weird setup
	@inject(BindingType.Container)
	protected readonly container!: Container;

	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	@inject(BindingType.DataTransferObjects)
	protected readonly dataTransferObjects!: Record<string, any>;

	public signedTransaction(identifier: string, signedData: string, broadcastData: any): SignedTransactionData {
		const signedTransaction = this.container.resolve<SignedTransactionData>(
			this.dataTransferObjects.SignedTransactionData,
		);
		signedTransaction.configure(
			identifier,
			signedData,
			broadcastData,
			this.configRepository.get<number>(ConfigKey.CurrencyDecimals),
		);

		return signedTransaction;
	}

	public transaction(transaction: unknown): TransactionDataType & TransactionData {
		const instance: TransactionData = this.#resolveTransactionClass("TransactionData", transaction);

		if (instance.isDelegateRegistration()) {
			return this.#resolveTransactionClass("DelegateRegistrationData", transaction);
		}

		if (instance.isDelegateResignation()) {
			return this.#resolveTransactionClass("DelegateResignationData", transaction);
		}

		if (instance.isHtlcClaim()) {
			return this.#resolveTransactionClass("HtlcClaimData", transaction);
		}

		if (instance.isHtlcLock()) {
			return this.#resolveTransactionClass("HtlcLockData", transaction);
		}

		if (instance.isHtlcRefund()) {
			return this.#resolveTransactionClass("HtlcRefundData", transaction);
		}

		if (instance.isIpfs()) {
			return this.#resolveTransactionClass("IpfsData", transaction);
		}

		if (instance.isMultiPayment()) {
			return this.#resolveTransactionClass("MultiPaymentData", transaction);
		}

		if (instance.isMultiSignature()) {
			return this.#resolveTransactionClass("MultiSignatureData", transaction);
		}

		if (instance.isSecondSignature()) {
			return this.#resolveTransactionClass("SecondSignatureData", transaction);
		}

		if (instance.isTransfer()) {
			return this.#resolveTransactionClass("TransferData", transaction);
		}

		if (instance.isVote()) {
			return this.#resolveTransactionClass("VoteData", transaction);
		}

		if (instance.isUnvote()) {
			return this.#resolveTransactionClass("VoteData", transaction);
		}

		return instance;
	}

	public transactions(transactions: unknown[], meta: MetaPagination): TransactionDataCollection {
		return new TransactionDataCollection(
			transactions.map((transaction) => this.transaction(transaction)),
			meta,
		);
	}

	public wallet(wallet: unknown): WalletData {
		return this.container.resolve<WalletData>(this.dataTransferObjects.WalletData).fill(wallet);
	}

	#resolveTransactionClass(klass: string, transaction: unknown): TransactionData {
		return this.container
			.resolve<TransactionData>((get(this.dataTransferObjects, klass) || get(DataTransferObjects, klass))!)
			.configure(transaction)
			.withDecimals(this.configRepository.get(ConfigKey.CurrencyDecimals));
	}
}
