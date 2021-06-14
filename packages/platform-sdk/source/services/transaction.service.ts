/* istanbul ignore file */

import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { NumberLike } from "@arkecosystem/platform-sdk-support";
import { BigNumberService } from "./big-number.service";

import { ConfigRepository } from "../coins";
import { RawTransactionData, SignedTransactionData } from "../contracts";
import { NotImplemented } from "../exceptions";
import { inject, injectable } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import { DataTransferObjectService } from "./data-transfer-object.contract";
import {
	DelegateRegistrationInput,
	DelegateResignationInput,
	HtlcClaimInput,
	HtlcLockInput,
	HtlcRefundInput,
	IpfsInput,
	MultiPaymentInput,
	MultiSignatureInput,
	SecondSignatureInput,
	TransactionInputs,
	TransactionService as Contract,
	TransferInput,
	VoteInput,
} from "./transaction.contract";

@injectable()
export class AbstractTransactionService implements Contract {
	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	@inject(BindingType.DataTransferObjectService)
	protected readonly dataTransferObjectService!: DataTransferObjectService;

	@inject(BindingType.HttpClient)
	protected readonly httpClient!: HttpClient;

	@inject(BindingType.BigNumberService)
	protected readonly bigNumberService!: BigNumberService;

	public async transfer(input: TransferInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.transfer.name);
	}

	public async secondSignature(input: SecondSignatureInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.secondSignature.name);
	}

	public async delegateRegistration(input: DelegateRegistrationInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.delegateRegistration.name);
	}

	public async vote(input: VoteInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.vote.name);
	}

	public async multiSignature(input: MultiSignatureInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.multiSignature.name);
	}

	public async ipfs(input: IpfsInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.ipfs.name);
	}

	public async multiPayment(input: MultiPaymentInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.multiPayment.name);
	}

	public async delegateResignation(input: DelegateResignationInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.delegateResignation.name);
	}

	public async htlcLock(input: HtlcLockInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.htlcLock.name);
	}

	public async htlcClaim(input: HtlcClaimInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.htlcClaim.name);
	}

	public async htlcRefund(input: HtlcRefundInput): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.htlcRefund.name);
	}

	public async multiSign(transaction: RawTransactionData, input: TransactionInputs): Promise<SignedTransactionData> {
		throw new NotImplemented(this.constructor.name, this.multiSign.name);
	}

	public async estimateExpiration(value?: string): Promise<string | undefined> {
		return undefined;
	}

	protected toSatoshi(value: NumberLike): BigNumber {
		return this.bigNumberService.make(value).toSatoshi(this.configRepository.get<number>("network.currency.decimals"));
	}
}
