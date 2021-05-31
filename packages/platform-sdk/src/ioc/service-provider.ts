import { CoinServices, CoinSpec, Config } from "../coins";
import { Container } from "./container";

export abstract class AbstractServiceProvider {
	protected readonly coin: CoinSpec;
	protected readonly config: Config;

	public constructor(coin: CoinSpec, config: Config) {
		this.coin = coin;
		this.config = config;
	}

	abstract make(): Promise<CoinServices>;

	protected async makeServices(services: Record<string, { __construct: Function }>): Promise<CoinServices> {
		const [
			client,
			dataTransferObject,
			fee,
			identity,
			knownWallets,
			ledger,
			link,
			message,
			multiSignature,
			signatory,
			transaction,
			walletDiscovery,
		] = await Promise.all<any>([
			services.ClientService.__construct(this.config),
			services.DataTransferObjectService.__construct(this.config),
			services.FeeService.__construct(this.config),
			services.IdentityService.__construct(this.config),
			services.KnownWalletService.__construct(this.config),
			services.LedgerService.__construct(this.config),
			services.LinkService.__construct(this.config),
			services.MessageService.__construct(this.config),
			services.MultiSignatureService.__construct(this.config),
			services.SignatoryService.__construct(this.config),
			services.TransactionService.__construct(this.config),
			services.WalletDiscoveryService.__construct(this.config),
		]);

		return {
			client,
			dataTransferObject,
			fee,
			identity,
			knownWallets,
			ledger,
			link,
			message,
			multiSignature,
			signatory,
			transaction,
			walletDiscovery,
		};
	}

	protected async bindServices(services: CoinServices, container: Container): Promise<CoinServices> {
		return services;
	}
}
