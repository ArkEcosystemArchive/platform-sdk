import { Services } from "@arkecosystem/platform-sdk";
export declare class KnownWalletService extends Services.AbstractKnownWalletService {
	#private;
	private readonly configRepository;
	private readonly httpClient;
	all(): Promise<Services.KnownWallet[]>;
	private onPostConstruct;
}
