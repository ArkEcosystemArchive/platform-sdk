/* istanbul ignore file */

import { ConfigRepository } from "../coins";
import { TransactionDataCollection } from "../collections";
import { SignedTransactionData, TransactionDataType } from "../contracts";
import { AbstractTransactionData } from "../dto";
import { NotImplemented } from "../exceptions";
import { Container, inject, injectable } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import { MetaPagination } from "./client.contract";
import { DataTransferObjectService } from "./data-transfer-object.contract";

@injectable()
export abstract class AbstractDataTransferObjectService implements DataTransferObjectService {
	// @TODO: rework so that the container is not needed, this is a weird setup
	@inject(BindingType.Container)
	protected readonly container!: Container;

	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	public signedTransaction(identifier: string, signedData: string, broadcastData: any): SignedTransactionData {
		throw new NotImplemented(this.constructor.name, this.signedTransaction.name);
	}

	public transaction(
		transaction: unknown,
		dtos: Record<string, any>,
	): TransactionDataType & AbstractTransactionData {
		const instance: TransactionDataType = this.container.resolve<any>(dtos.TransactionData).configure(transaction);

		if (instance.isDelegateRegistration()) {
			return this.container.resolve<any>(dtos.DelegateRegistrationData).configure(transaction);
		}

		if (instance.isDelegateResignation()) {
			return this.container.resolve<any>(dtos.DelegateResignationData).configure(transaction);
		}

		if (instance.isHtlcClaim()) {
			return this.container.resolve<any>(dtos.HtlcClaimData).configure(transaction);
		}

		if (instance.isHtlcLock()) {
			return this.container.resolve<any>(dtos.HtlcLockData).configure(transaction);
		}

		if (instance.isHtlcRefund()) {
			return this.container.resolve<any>(dtos.HtlcRefundData).configure(transaction);
		}

		if (instance.isIpfs()) {
			return this.container.resolve<any>(dtos.IpfsData).configure(transaction);
		}

		if (instance.isMultiPayment()) {
			return this.container.resolve<any>(dtos.MultiPaymentData).configure(transaction);
		}

		if (instance.isMultiSignature()) {
			return this.container.resolve<any>(dtos.MultiSignatureData).configure(transaction);
		}

		if (instance.isSecondSignature()) {
			return this.container.resolve<any>(dtos.SecondSignatureData).configure(transaction);
		}

		if (instance.isTransfer()) {
			return this.container.resolve<any>(dtos.TransferData).configure(transaction);
		}

		if (instance.isVote()) {
			return this.container.resolve<any>(dtos.VoteData).configure(transaction);
		}

		if (instance.isUnvote()) {
			return this.container.resolve<any>(dtos.VoteData).configure(transaction);
		}

		return instance as AbstractTransactionData;
	}

	public transactions(
		transactions: unknown[],
		meta: MetaPagination,
		classes: Record<string, any>,
		decimals?: number | string,
	): TransactionDataCollection {
		return new TransactionDataCollection(
			transactions.map((transaction) => this.transaction(transaction, classes).withDecimals(decimals)),
			meta,
		);
	}
}
