/* istanbul ignore file */

import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { ConfigRepository } from "../coins";
import { TransactionDataCollection, WalletDataCollection } from "../collections";
import { KeyValuePair, SignedTransactionData, TransactionDataType, WalletData } from "../contracts";
import { NotImplemented } from "../exceptions";
import { inject } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";
import {
	BroadcastResponse,
	ClientService,
	ClientTransactionsInput,
	ClientWalletsInput,
	TransactionDetailInput,
	VoteReport,
} from "./client.contract";
import { DataTransferObjectService } from "./data-transfer-object.contract";

export abstract class AbstractClientService implements ClientService {
	@inject(BindingType.ConfigRepository)
	protected readonly configRepository!: ConfigRepository;

	@inject(BindingType.DataTransferObjectService)
	protected readonly dataTransferObjectService!: DataTransferObjectService;

	@inject(BindingType.HttpClient)
	protected readonly httpClient!: HttpClient;

	public async __destruct(): Promise<void> {
		//
	}

	public async transaction(id: string, input?: TransactionDetailInput): Promise<TransactionDataType> {
		throw new NotImplemented(this.constructor.name, this.transaction.name);
	}

	public async transactions(query: ClientTransactionsInput): Promise<TransactionDataCollection> {
		throw new NotImplemented(this.constructor.name, this.transactions.name);
	}

	public async wallet(id: string): Promise<WalletData> {
		throw new NotImplemented(this.constructor.name, this.wallet.name);
	}

	public async wallets(query: ClientWalletsInput): Promise<WalletDataCollection> {
		throw new NotImplemented(this.constructor.name, this.wallets.name);
	}

	public async delegate(id: string): Promise<WalletData> {
		throw new NotImplemented(this.constructor.name, this.delegate.name);
	}

	public async delegates(query?: KeyValuePair): Promise<WalletDataCollection> {
		throw new NotImplemented(this.constructor.name, this.delegates.name);
	}

	public async votes(id: string): Promise<VoteReport> {
		throw new NotImplemented(this.constructor.name, this.votes.name);
	}

	public async voters(id: string, query?: KeyValuePair): Promise<WalletDataCollection> {
		throw new NotImplemented(this.constructor.name, this.voters.name);
	}

	public async broadcast(transactions: SignedTransactionData[]): Promise<BroadcastResponse> {
		throw new NotImplemented(this.constructor.name, this.broadcast.name);
	}
}
