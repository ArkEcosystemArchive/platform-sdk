import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { ConfigRepository } from "../coins";
import { RawTransactionData, SignedTransactionData } from "../contracts";
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
export declare class AbstractTransactionService implements Contract {
	protected readonly configRepository: ConfigRepository;
	protected readonly dataTransferObjectService: DataTransferObjectService;
	protected readonly httpClient: HttpClient;
	transfer(input: TransferInput): Promise<SignedTransactionData>;
	secondSignature(input: SecondSignatureInput): Promise<SignedTransactionData>;
	delegateRegistration(input: DelegateRegistrationInput): Promise<SignedTransactionData>;
	vote(input: VoteInput): Promise<SignedTransactionData>;
	multiSignature(input: MultiSignatureInput): Promise<SignedTransactionData>;
	ipfs(input: IpfsInput): Promise<SignedTransactionData>;
	multiPayment(input: MultiPaymentInput): Promise<SignedTransactionData>;
	delegateResignation(input: DelegateResignationInput): Promise<SignedTransactionData>;
	htlcLock(input: HtlcLockInput): Promise<SignedTransactionData>;
	htlcClaim(input: HtlcClaimInput): Promise<SignedTransactionData>;
	htlcRefund(input: HtlcRefundInput): Promise<SignedTransactionData>;
	multiSign(transaction: RawTransactionData, input: TransactionInputs): Promise<SignedTransactionData>;
	estimateExpiration(value?: string): Promise<string | undefined>;
}
