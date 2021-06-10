import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { ConfigRepository } from "../coins";
import { TransactionDataCollection, WalletDataCollection } from "../collections";
import { KeyValuePair, SignedTransactionData, TransactionDataType, WalletData } from "../contracts";
import {
	BroadcastResponse,
	ClientService,
	ClientTransactionsInput,
	ClientWalletsInput,
	TransactionDetailInput,
	VoteReport,
} from "./client.contract";
import { DataTransferObjectService } from "./data-transfer-object.contract";
export declare class AbstractClientService implements ClientService {
	protected readonly configRepository: ConfigRepository;
	protected readonly dataTransferObjectService: DataTransferObjectService;
	protected readonly httpClient: HttpClient;
	transaction(id: string, input?: TransactionDetailInput): Promise<TransactionDataType>;
	transactions(query: ClientTransactionsInput): Promise<TransactionDataCollection>;
	wallet(id: string): Promise<WalletData>;
	wallets(query: ClientWalletsInput): Promise<WalletDataCollection>;
	delegate(id: string): Promise<WalletData>;
	delegates(query?: KeyValuePair): Promise<WalletDataCollection>;
	votes(id: string): Promise<VoteReport>;
	voters(id: string, query?: KeyValuePair): Promise<WalletDataCollection>;
	broadcast(transactions: SignedTransactionData[]): Promise<BroadcastResponse>;
}
