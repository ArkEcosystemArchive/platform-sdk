import { Contracts, Services } from "@arkecosystem/platform-sdk";
export declare class TransactionService extends Services.AbstractTransactionService {
	#private;
	protected readonly clientService: Services.ClientService;
	protected readonly addressService: Services.AddressService;
	protected readonly keyPairService: Services.KeyPairService;
	transfer(input: Services.TransferInput): Promise<Contracts.SignedTransactionData>;
	private onPostConstruct;
}
