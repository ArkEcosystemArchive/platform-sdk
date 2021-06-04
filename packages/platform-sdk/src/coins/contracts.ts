import { HttpClient } from "@arkecosystem/platform-sdk-http";

import { CoinManifest } from "../networks/network.models";
import {
	ClientService,
	DataTransferObjectService,
	FeeService,
	IdentityService,
	KnownWalletService,
	LedgerService,
	LinkService,
	MessageService,
	MultiSignatureService,
	SignatoryService,
	TransactionService,
	WalletDiscoveryService,
} from "../services";
import { BigNumberService } from "../services/big-number.service";

export interface CoinSpec {
	manifest: CoinManifest;
	schema: any;
	ServiceProvider: any;
}

export interface CoinOptions {
	network: string;
	httpClient: HttpClient;
}

export interface CoinServices {
	bigNumber: BigNumberService;
	client: ClientService;
	dataTransferObject: DataTransferObjectService;
	fee: FeeService;
	identity: IdentityService;
	knownWallets: KnownWalletService;
	ledger: LedgerService;
	link: LinkService;
	message: MessageService;
	multiSignature: MultiSignatureService;
	signatory: SignatoryService;
	transaction: TransactionService;
	walletDiscovery: WalletDiscoveryService;
}
